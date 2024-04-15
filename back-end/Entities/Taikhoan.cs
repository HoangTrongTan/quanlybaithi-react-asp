using System;
using System.Collections.Generic;

namespace Webquanlybaithi.Entities;

public partial class Taikhoan
{
    public int Id { get; set; }

    public string? Tendangnhap { get; set; }

    public string? UserpassHash { get; set; }

    public string? Chucvuloai { get; set; }

    public string? Makhoa { get; set; }

    public int? Idkhoadk { get; set; }

    public int? Idlop { get; set; }

    public string? UserpassSalt { get; set; }

    public string? Username { get; set; }

    public virtual KhoaDk? IdkhoadkNavigation { get; set; }

    public virtual Lop? IdlopNavigation { get; set; }

    public virtual Khoa? MakhoaNavigation { get; set; }
}
