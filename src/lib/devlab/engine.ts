import type { DevLabEngineName, DevLabCommandResult } from "./types";
import { dockerEngine } from "./engines/dockerEngine";

const engines: Record<DevLabEngineName, { handleCommand(cmd: string): DevLabCommandResult }> = {
  docker: dockerEngine,
};

export const DevLabEngine = {
  handleCommand(engine: DevLabEngineName, cmd: string): DevLabCommandResult {
    const impl = engines[engine];
    if (!impl) {
      return { lines: [`[DevLab] Unknown engine: ${engine}`] };
    }
    return impl.handleCommand(cmd);
  },
};
