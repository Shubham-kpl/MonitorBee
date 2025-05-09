"""! @brief This module provides access to the neural network."""
##
# @file BeeClassification.py
#
# @brief Process that runs the neural network fir bee image classification
#
# @section authors Author(s)
# - Created by Fabian Hickert on december 2020
#
from Utils import get_config
from os import listdir, makedirs
from os.path import isfile, join, exists
from datetime import datetime
import cv2
import time
import queue
import multiprocessing
import logging
from BeeProcess import BeeProcess

logger = logging.getLogger(__name__)

class BeeClassification(BeeProcess):
    """! The 'BeeClassification' class provides access to the neural network
          which runs in a seperate process. It provides two queue-objects,
          one to queue to incoming images that have to be processed by the
          neural network and a second one, where the results are put.
    """

    def __init__(self):

        """! Initializes the neural network and the queues
        """
        super().__init__()

        # reports when the porcess with the neural network is ready
        self._ready = multiprocessing.Value('i', 0)
        self.set_process_param("ready", self._ready)

        # The queue for the incoming images
        self._q_in = multiprocessing.Queue(maxsize=20)
        self.set_process_param("q_in", self._q_in)

        ## The queue where the results are reported
        self._q_out = multiprocessing.Queue()
        self.set_process_param("q_out", self._q_out)

        # Start the process and wait for it to run
        self.start()
        while self._ready.value == 0:
            time.sleep(5)
            logger.info("Waiting for neural network, this may take up to two minutes")
        logger.debug("Classification terminated")

    def getQueue(self):
        """! Returns the queue-object for the icoming queue
        @return  Returns the incoming queue object
        """
        return self._q_in

    def getResultQueue(self):
        """! Returns the queue-object which holds the classification results
        @return  Returns the result queue object
        """
        return self._q_out

    @staticmethod
    def run(q_in, q_out, ready, parent, stopped, done):
        """! Static method, starts a new process that runs the neural network
        """

        # Include tensorflow within the process
        import tensorflow as tf
        # from tf.keras.models import Sequential

        _process_time = 0
        _process_cnt = 0

        # Enable growth of GPU usage
        config = tf.compat.v1.ConfigProto()
        config.gpu_options.allow_growth = True
        config.gpu_options.per_process_gpu_memory_fraction = 0.75  # added to limit GPU memory usage
        session = tf.compat.v1.InteractiveSession(config=config)

        # Load the model
        try:
            model_path = 'F:\shubham programming\projects\MonitorBee\model\model.h5'
            logger.debug(f"Loading model from: {model_path}")
            _model = tf.keras.models.load_model(model_path)
            _model.trainable = False
        except Exception as e:
            ready.value = True
            logger.error("Failed to load Model: %s" % (e,))
            return


        # Detect desired image size for classification
        img_height = 300
        img_width = 150
        if get_config("NN_CLASSIFY_RESOLUTION") == "EXT_RES_75x150":
            img_height = 150
            img_width = 75

        # Initialize the network by using it
        # This ensures everything is preloaded when needed
        if True:

            # Load all images from the "Images" folder and feed them to the neural network
            # This ensures that the network is fully running when we start other processes
            images_dir=r"F:\shubham programming\projects\MonitorBee\data\Images\all-images"
            test_images = [join(images_dir, f) for f in listdir(images_dir) if isfile(join(images_dir, f))]
            imgs = []
            for item in test_images:
                img = tf.io.read_file(item)
                img = tf.image.decode_jpeg(img, channels=3)
                img = tf.image.resize(img, [img_height, img_width])
                imgs.append(img)

            # Perform prediction
            _model.predict_on_batch(tf.convert_to_tensor(imgs))

        # Mark process as ready
        ready.value = True

        # Create folders to store images with positive results
        if get_config("SAVE_DETECTION_IMAGES"):
            for lbl in ["varroa", "pollen", "wasps", "cooling"]:
                s_path = get_config("SAVE_DETECTION_PATH")
                if not exists(join(s_path, lbl)):
                    makedirs(join(s_path, lbl))

        classify_thres = get_config("CLASSIFICATION_THRESHOLDS")
        while stopped.value == 0:

            # While the image classification queue is not empty
            # feed the images to the network and push the result
            # back in the outgoing queue
            if not q_in.empty():
                _start_t = time.time()
                _process_cnt += 1

                images = []
                images_orig = []
                tracks = []

                # Load the images from the in-queue and prepare them for the use in the network
                failed = False
                while len(images) < 5 and stopped.value == 0:
                    try:
                        item = q_in.get(block=False)
                    except queue.Empty:
                        item = None
                        break

                    if not item is None:
                        t, img, frame_id = item
                        # Change color from BGR to RGB
                        images_orig.append(img)
                        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                        if img.shape != (img_height, img_width, 3):
                            img = tf.image.resize(img, [img_height, img_width])
                        images.append(img)
                        tracks.append((t, frame_id))

                # Quit process if requested
                if stopped.value != 0:
                    return

                # Feed collected images to the network
                if len(tracks):
                    results = _model.predict_on_batch(tf.convert_to_tensor(images))

                    # precess results
                    for num, t_data in enumerate(tracks):

                        track, frame_id = t_data

                        # Create dict with results
                        entry = set([])
                        for lbl_id, lbl in enumerate(["varroa", "pollen", "wasps", "cooling"]):
                            if results[lbl_id][num][0] > classify_thres[lbl]:
                                entry.add(lbl)

                                # Save the corresponding image on disc
                                if get_config("SAVE_DETECTION_IMAGES") and lbl in get_config("SAVE_DETECTION_TYPES"):

                                    img = images_orig[num]
                                    cv2.imwrite(get_config("SAVE_DETECTION_PATH") + "/%s/%i-%s-%i.jpeg" % (lbl, _process_cnt, \
                                            datetime.now().strftime("%Y%m%d-%H%M%S"), frame_id), img)

                        # Push results back
                        q_out.put((tracks[num][0], entry))

                _end_t = time.time() - _start_t
                logger.debug("Process time: %0.3fms - Queued: %i, processed %i" % (_end_t * 1000.0, q_in.qsize(), len(images)))
                _process_time += _end_t
            else:
                time.sleep(0.5)
        logger.info("Classification stopped")