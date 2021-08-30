import path from "path";
import fs from "fs-extra";

export const clean = (dest) => {
  return {
    name: `clean`,
    buildStart() {
      // eslint-disable-next-line no-undef
      const cwd = process.cwd();
      const destDir = path.join(cwd, dest);
      fs.removeSync(destDir);
    },
  };
};
