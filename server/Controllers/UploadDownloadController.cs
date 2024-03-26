using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UploadDownloadController : ControllerBase{
    private readonly string _SaveFilesDir;
    public UploadDownloadController(){
        _SaveFilesDir = "Upload/files";
    }

    private async Task<string> WriteFile(IFormFile file){
        string filename = "";
        try{
            var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
            filename = DateTime.Now.Ticks.ToString() + extension;

            var filepath = Path.Combine(Directory.GetCurrentDirectory(), _SaveFilesDir);

            if(!Directory.Exists(filepath)){
                Directory.CreateDirectory(filepath);
            }

            var exactpath = Path.Combine(Directory.GetCurrentDirectory(), _SaveFilesDir, filename);
            using (var stream = new FileStream(exactpath, FileMode.Create)){
                await file.CopyToAsync(stream);
            }

            return filename;
        }
        catch{
        }
        return filename;
    }

    [HttpPost]
    [Route("UploadFile")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UploadFile(IFormFile file, CancellationToken cancellationtoken){
        try{
            var result = await WriteFile(file);

            return Ok(result);
        }
        catch(Exception ex){
            throw ex;
        }
    }

    [HttpGet]
    [Route("DownloadFile")]
    public async Task<IActionResult> DownloadFile(string filename){
        var filepath = Path.Combine(Directory.GetCurrentDirectory(), _SaveFilesDir, filename);

        var provider = new FileExtensionContentTypeProvider();
        if(!provider.TryGetContentType(filepath, out var contenttype)){
            contenttype = "application/octet-stream";
        }

        var bytes = await System.IO.File.ReadAllBytesAsync(filepath);
        return File(bytes, contenttype, Path.GetFileName(filepath));
    }
}