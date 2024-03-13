namespace VisitorManager.Models;

public class Visitor
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string _id { get; set; }

    [BsonElement("visitor_name")]
    public string Name { get; set; }

    [BsonElement("visitor_message")]
    public string Message { get; set; }
}

public class VisitorUpdateModel
{
    public string Name { get; set; }
    public string Message { get; set; }
}

public class VisitorCreateModel
{
    public string Name { get; set; }
    public string Message { get; set; }
}