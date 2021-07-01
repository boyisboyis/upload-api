export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  tmp: process.env.TEMP_PATH || '/tmp/images',
  dest: process.env.DESTINATION_PATH || '/tmp/dest-images',
});
