# Simple Compress Image

## Support

Only jpeg and png file type

## Environment

```bash
# for temp file
TEMP_PATH=/tmp/multer

# for storage image
DESTINATION_PATH=/Users/boyisboyis/Drive/Work/codecool/upload-api/src/assets
```

## Example

[POST] http://localhost:3000/upload-image

```bash
  # form-data
  {
    file: File
  }
  # response
  {
    fileName: "9C3C302A-D970-4176-A450-361A7CE06FAC.JPEG",
    generateFileName: "9C3C302A-D970-4176-A450-361A7CE06FAC.JPEG-1625159853796.jpg",
    path: "/Users/boyisboyis/Drive/Work/codecool/upload-api/src/assets/9C3C302A-D970-4176-A450-361A7CE06FAC.JPEG-1625159853796.jpg"
}
```

[POST] http://localhost:3000/upload-image/compress

```bash
  # form-data
  {
    file: File
  }
  # Response
  File Buffer
```
