using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Webquanlybaithi.Entities;

public partial class Hocphan
{
    public string Ma { get; set; } = null!;

    public string? Tenhocphan { get; set; }
    [JsonIgnore]
    public virtual ICollection<FilesUp>? FilesUps { get; set; } = new List<FilesUp>();

    public virtual ICollection<Monhockhoa>? Monhockhoas { get; set; } = new List<Monhockhoa>();
}
