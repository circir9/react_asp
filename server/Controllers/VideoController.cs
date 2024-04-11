using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VideoController : ControllerBase{
    private readonly UploadDownSettings _VideoUpUploadDownSetting;
    private readonly string _SaveFilesDir;

    public VideoController(VideoUploadDownSetting uploadDownSetting){
        _VideoUpUploadDownSetting = uploadDownSetting;
        _SaveFilesDir = _VideoUpUploadDownSetting.FilesDir;
    }

    [HttpGet]
    public async Task<IActionResult> Get(){
        var filename = "test.mp4";  
        //Build the File Path.  
        string filepath = Path.Combine(Directory.GetCurrentDirectory(), _SaveFilesDir, filename);
    
        var filestream = System.IO.File.OpenRead(filepath);
        return File(filestream, "video/mp4", fileDownloadName: filename, enableRangeProcessing: true);
    }
}