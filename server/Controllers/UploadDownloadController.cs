using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UploadDownloadController : ControllerBase{
    private readonly string _SaveFilesDir;
    private readonly MyUploadDownSetting _MyUploadDownSetting;
    private AppDbContext _sqlServerContext;

    public UploadDownloadController(AppDbContext context, MyUploadDownSetting uploadDownSetting){
        _sqlServerContext = context;
        _MyUploadDownSetting = uploadDownSetting;
        _SaveFilesDir = _MyUploadDownSetting.FilesDir;
    }

    private async Task<GetFileModel> WriteFile(IFormFile file){
        string filename = "";
        string originFileName = "";
        string userName = "nobody";
        DateTime uploadTime = DateTime.Now;
        GetFileModel returnFile = new();

        try{
            originFileName = file.FileName;
            var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
            filename = uploadTime.Ticks.ToString() + extension;

            string filepath = Path.Combine(Directory.GetCurrentDirectory(), _SaveFilesDir);

            if(!Directory.Exists(filepath)){
                Directory.CreateDirectory(filepath);
            }

            var exactpath = Path.Combine(Directory.GetCurrentDirectory(), _SaveFilesDir, filename);
            using (var stream = new FileStream(exactpath, FileMode.Create)){
                await file.CopyToAsync(stream);
            }

            _sqlServerContext.Upload_files.Add(new Upload_file{
                File_name = originFileName,
                Path = exactpath,
                User_name = userName,
                Upload_time = uploadTime});
            _sqlServerContext.SaveChanges();

            var dbfile = _sqlServerContext.Upload_files.SingleOrDefault(x => x.Upload_time == uploadTime);
            if(dbfile is not null){
                returnFile = new GetFileModel{
                    ID = dbfile.ID,
                    File_name = originFileName,
                    Upload_time = uploadTime
                };
            }

            return returnFile;
        }
        catch{
        }
        return returnFile;
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
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet]
    [Route("DownloadFile")]
    public async Task<IActionResult> DownloadFile(int ID){
        string filepath = "";
        string filename = "";
        var dbfile = _sqlServerContext.Upload_files.SingleOrDefault(x => x.ID == ID);
        if (dbfile is not null){
            var dbfilePath = dbfile.Path;
            var dbfileFileName = dbfile.File_name;
            if(dbfilePath is not null){
                filepath = dbfilePath;
            }
            if(dbfileFileName is not null){
                filename = dbfileFileName;
            }
        }

        if (!System.IO.File.Exists(filepath)){
            return NotFound();
        }

        var provider = new FileExtensionContentTypeProvider();
        if(!provider.TryGetContentType(filepath, out var contenttype)){
            contenttype = "application/octet-stream";
        }

        var bytes = await System.IO.File.ReadAllBytesAsync(filepath);
        // return File(bytes, contenttype, Path.GetFileName(filepath));
        return File(bytes, contenttype, filename);
    }

    [HttpDelete]
    [Route("DeleteFile")]
    public IActionResult DeleteFile(int ID){
        try{
            string filepath="";
            var dbfile = _sqlServerContext.Upload_files.SingleOrDefault(x => x.ID == ID);
            if (dbfile is not null){
                var dbfilePath = dbfile.Path;
                if(dbfilePath is not null){
                    filepath = dbfilePath;
                }
                _sqlServerContext.Upload_files.Remove(dbfile);
                _sqlServerContext.SaveChanges();
            }
            
            if (!System.IO.File.Exists(filepath)){
                return NotFound();
            }

            System.IO.File.Delete(filepath);
            return NoContent();
        }
        catch (Exception ex){
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet]
    [Route("Files")]
    public ActionResult<IEnumerable<GetFileModel>> GetAll(){

        var results = _sqlServerContext.Upload_files
        .Select(x =>new GetFileModel{
            ID = x.ID,
            File_name = x.File_name,
            Upload_time = x.Upload_time}).ToList();

        return results;
    }
}