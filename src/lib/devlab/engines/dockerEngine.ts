import type { DevLabCommandResult } from "../types";
import { emit } from "../events/eventBus";

type DockerImage = { name: string };
type DockerContainer = { id: string; image: string; name: string; status: string };

const state = {
  images: [] as DockerImage[],
  containers: [] as DockerContainer[],
};

function randomId() {
  return Math.random().toString(16).slice(2, 10);
}

export const dockerEngine = {
  handleCommand(cmd: string): DevLabCommandResult {
    const trimmed = cmd.trim();

    if (trimmed.startsWith("docker pull")) {
      const [, , imageName] = trimmed.split(/\s+/);
      if (!imageName) {
        return { lines: ["Error: image name required"] };
      }

      const image: DockerImage = { name: imageName };
      state.images.push(image);
      emit("docker:imagePulled", image);

      return {
        lines: [
          `Using default tag: latest`,
          `latest: Pulling from library/${imageName}`,
          `Downloaded image: ${imageName}:latest`,
        ],
        events: ["docker:imagePulled"],
      };
    }

    if (trimmed.startsWith("docker run")) {
      const parts = trimmed.split(/\s+/);
      const imageName = parts[parts.length - 1];
      const id = randomId();
      const container: DockerContainer = {
        id,
        image: imageName,
        name: `${imageName}-${id.slice(0, 4)}`,
        status: "Up 5 seconds",
      };
      state.containers.push(container);
      emit("docker:containerCreated", container);

      return {
        lines: [
          `Starting container from image ${imageName}...`,
          `Container started: ${container.id}`,
        ],
        events: ["docker:containerCreated"],
      };
    }

    if (trimmed === "docker ps") {
      if (state.containers.length === 0) {
        return { lines: ["No running containers"] };
      }

      const header =
        "CONTAINER ID   IMAGE        STATUS          NAMES";
      const rows = state.containers.map(
        (c) => `${c.id}   ${c.image}   ${c.status}   ${c.name}`
      );

      return { lines: [header, ...rows] };
    }

    return {
      lines: [
        `Command not supported in DevLab Docker simulator:`,
        `  ${trimmed}`,
      ],
    };
  },
};
