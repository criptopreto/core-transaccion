import httpProxy from "http-proxy";

const API_URL = process.env.API_URL;

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handle(req, res) {
  return proxy.web(req, res, {
    target: API_URL,
    changeOrigin: true,
  });
}
