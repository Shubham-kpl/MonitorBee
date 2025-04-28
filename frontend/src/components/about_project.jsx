import React from "react";
import "./css/about_project.css";

export default function AboutProject() {
  return (
    <section id="about-project" className="about-project">
      <h1 style={{ marginBottom: "2rem" }}>This Project</h1>
      <p>
        At BeeCognition, our vision is to provide an advanced, reliable, and
        easy-to-use monitoring system that leverages state-of-the-art machine
        learning and computer vision techniques to support sustainable
        beekeeping practices. We aim to help in identifying and tracking bees,
        detecting bee characteristics such as pollen packages, varroa mite
        infestations, and even wasps, and ensuring the health and productivity
        of hives.
      </p>
      <p>
        Our system utilizes a combination of hardware and software to deliver
        real-time insights and data about bee activity within a hive. Here's
        what BeeCognition can do:
      </p>
      <ul>
        <li>
          <span>Count Bees Entering or Leaving the Hive:</span>By monitoring
          hive entrances and exits, we can provide accurate counts of bee
          traffic.
        </li>
        <li>
          <span>Detect Varroa Infected Bees:</span>Using neural networks, our
          system identifies bees that are infested with varroa mites.
        </li>
        <li>
          <span>Identify Bees Cooling the Hive:</span>Bees that fan their wings
          to cool the hive are detected and counted.
        </li>
        <li>
          <span>Detect Bees with Pollen:</span>We identify and count bees
          carrying pollen packets.
        </li>
        <li>
          <span>Detect Wasps:</span>The system also detects wasps, which can be
          a threat to the hive.
        </li>
      </ul>
      Each frame from the camera is processed to identify bees, track their
      movements, and classify their activities using a neural network. The
      results are sent to The Things Network via LoRaWAN, allowing for seamless
      data collection and monitoring.
    </section>
  );
}
