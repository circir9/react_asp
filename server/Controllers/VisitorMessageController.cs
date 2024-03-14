using Microsoft.AspNetCore.Mvc;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VisitorMessageController : ControllerBase{
    private readonly IMongoCollection<Visitor> _visitors;

    public VisitorMessageController(IOptions<SCSharpDatabaseSettings> options){
        var mongoClient = new MongoClient(options.Value.ConnectionString);

        _visitors = mongoClient
            .GetDatabase(options.Value.DatabaseName)
            .GetCollection<Visitor>(options.Value.VisitorCollectionName);
    }

    [HttpGet]
    public async Task<ActionResult<List<Visitor>>> GetAll(){
        var visitors = await _visitors.Find(_ => true).ToListAsync();
        return visitors;
    }

    [Route("{id}")]
    [HttpGet]
    public async Task<ActionResult<Visitor>> Get(string id){
        var visitor = await _visitors.Find(s => s._id == id).FirstOrDefaultAsync();
        if (visitor == null){
            return NotFound();
        }
        return visitor;
    }

    [HttpPost]
    public async Task<ActionResult<Visitor>> Post(VisitorCreateModel createModel){
        string uuid = Guid.NewGuid().ToString("N").Substring(0, 24);
        var visitor = new Visitor{
            _id = uuid,
            Name = createModel.Name,
            Message = createModel.Message
        };
        await _visitors.InsertOneAsync(visitor);

        return Created($"/api/visitor/{uuid}", visitor);
    }

    [Route("{id}")]
    [HttpPatch]
    public async Task<IActionResult> Patch(string id, VisitorUpdateModel updateModel){
        var existingVisitor = await _visitors.Find(s => s._id == id).FirstOrDefaultAsync();
        if (existingVisitor == null){
            return NotFound();
        }

        existingVisitor.Message = updateModel.Message;

        var update = Builders<Visitor>.Update
            .Set(s => s.Message, existingVisitor.Message);

        await _visitors.UpdateOneAsync(s => s._id == id, update);

        return NoContent();
    }

    [Route("{id}")]
    [HttpDelete]
    public async Task<IActionResult> Delete(string id){

        var existingVisitor = await _visitors.Find(s => s._id == id).FirstOrDefaultAsync();
        if (existingVisitor == null){
            return NotFound();
        }

        await _visitors.DeleteOneAsync(s => s._id == id);

        return NoContent();
    }
}