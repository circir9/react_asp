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
    public async Task<IActionResult> Save(IFormFile chunkFile, [FromQuery] int index, [FromQuery] string filename)
    {
        long size = 0;
        try
        {
            string filepath = Path.Combine(Directory.GetCurrentDirectory(), _SaveFilesDir);

            if(!Directory.Exists(filepath)){
                Directory.CreateDirectory(filepath);
            }

            filename = Path.Combine(Directory.GetCurrentDirectory(), _SaveFilesDir, filename);
            size += chunkFile.Length;
            // for chunk-upload
            if (index==0)
            {
                using (FileStream fs = System.IO.File.Create(filename))
                {
                    chunkFile.CopyTo(fs);
                    fs.Flush();
                }
            }
            else
            {
                using (FileStream fs = System.IO.File.Open(filename, FileMode.Append))
                {
                    chunkFile.CopyTo(fs);
                    fs.Flush();
                }
            }
            return NoContent();
        }
        catch (Exception e)
        {
            Response.Clear();
            Response.StatusCode = 204;
            return NoContent();
            // Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = "File failed to upload";
            // Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = e.Message;
        }
        return NoContent();
    }
}