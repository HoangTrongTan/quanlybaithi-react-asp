
namespace Webquanlybaithi.Utils
{
    public class FilesUtil
    {
        public FilesUtil()
        {

        }
        public void deleteFile(string file)
        {
            var oldFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", file);
            if (System.IO.File.Exists(oldFilePath))
            {
                System.IO.File.Delete(oldFilePath);
            }
        }
        //public string saveFile(IFormFile file)
        //{
        //    var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
        //    var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
        //    var filePath = Path.Combine(uploadFolder, uniqueFileName);

        //    using (var stream = new FileStream(filePath, FileMode.Create))
        //    {
        //        var buffer = new byte[1000];
        //        int bytesRead;
        //        while ((bytesRead = file.OpenReadStream().Read(buffer, 0, buffer.Length)) > 0)
        //        {
        //            stream.Write(buffer, 0, bytesRead);
        //        }
        //    }

        //    return uniqueFileName;
        //}
        public async Task<string> saveFile(IFormFile file)
        {
            var uploadFolders = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
            var filePath = Path.Combine(uploadFolders, uniqueFileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return uniqueFileName;
        }
    }
}
