using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VideoController : ControllerBase{
    private readonly UploadDownSettings _VideoUpUploadDownSetting;
    private readonly string _SaveFilesDir;
    private string filename = "traget_video.mp4";

    public VideoController(VideoUploadDownSetting uploadDownSetting){
        _VideoUpUploadDownSetting = uploadDownSetting;
        _SaveFilesDir = _VideoUpUploadDownSetting.FilesDir;
    }

    [HttpGet]
    public async Task<IActionResult> GetVideo(){
        string filepath = Path.Combine(Directory.GetCurrentDirectory(), _SaveFilesDir);
        if(!Directory.Exists(filepath)){
            Directory.CreateDirectory(filepath);
        }
        //Build the File Path.
        var exactpath = Path.Combine(Directory.GetCurrentDirectory(), _SaveFilesDir, filename);

        if (!System.IO.File.Exists(exactpath)){
            return NotFound();
        }
    
        var filestream = System.IO.File.OpenRead(exactpath);
        return File(filestream, "video/mp4", fileDownloadName: filename, enableRangeProcessing: true);
    }

    private async Task<IActionResult> WriteFile(IFormFile file){
        try{

            string filepath = Path.Combine(Directory.GetCurrentDirectory(), _SaveFilesDir);

            if(!Directory.Exists(filepath)){
                Directory.CreateDirectory(filepath);
            }

            var exactpath = Path.Combine(Directory.GetCurrentDirectory(), _SaveFilesDir, filename);
            using (var stream = new FileStream(exactpath, FileMode.Create)){
                await file.CopyToAsync(stream);
            }

            return Ok();
        }
        catch{
        }
        return StatusCode(500, "Internal server error");
    }

    [HttpPost]
    [RequestSizeLimit(100*1024*1024)]
    public async Task<IActionResult> PostVideo(IFormFile file){
        try{
            if (file == null || file.Length == 0){
                return BadRequest("No file uploaded.");
            }
            if (file.ContentType != "video/mp4"){
                return BadRequest("Unsupported file format.");
            }

            return await WriteFile(file);
        }
        catch(Exception ex){
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}