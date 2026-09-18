import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";



const nextConfig: NextConfig = {
  allowedDevOrigins: ['10.39.1.156','10.113.136.140']
};

const withNextIntl = createNextIntlPlugin()


export default withNextIntl(nextConfig);
