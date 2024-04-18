using Microsoft.AspNetCore.Mvc;
// using Microsoft.AspNetCore.Authorization;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChunkController : ControllerBase{
    private readonly UploadDownSettings _ChunkUploadDownSetting;
    private readonly string _SaveFilesDir;

    public ChunkController(ChunkUploadDownSetting uploadDownSetting){
        _ChunkUploadDownSetting = uploadDownSetting;
        _SaveFilesDir = _ChunkUploadDownSetting.FilesDir;
    }
    // Upload save method for chunk-upload
    [HttpPost]
    public void Save(IList<IFormFile> chunkFile)
    {
        long size = 0;
        try
        {
            string filepath = Path.Combine(Directory.GetCurrentDirectory(), _SaveFilesDir);

            if(!Directory.Exists(filepath)){
                Directory.CreateDirectory(filepath);
            }
            // for chunk-upload
            foreach (var file in chunkFile)
            {
                var filename = file.FileName;

                filename = Path.Combine(Directory.GetCurrentDirectory(), _SaveFilesDir, filename);
                size += file.Length;
                if (!System.IO.File.Exists(filename))
                {
                    using (FileStream fs = System.IO.File.Create(filename))
                    {
                        file.CopyTo(fs);
                        fs.Flush();
                    }
                }
                else
                {
                    using (FileStream fs = System.IO.File.Open(filename, FileMode.Append))
                    {
                        file.CopyTo(fs);
                        fs.Flush();
                    }
                }
            }
        }
        catch (Exception e)
        {
            Response.Clear();
            Response.StatusCode = 204;
            // Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = "File failed to upload";
            // Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = e.Message;
        }
    }
}