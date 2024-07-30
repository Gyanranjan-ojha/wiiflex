import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
// import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // depending on your application, base can also be "/"
  base: "",
  plugins: [react(), viteTsconfigPaths()],
  // plugins: [tsconfigPaths(), react()],
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 5173
    port: 5173,
  },
});
