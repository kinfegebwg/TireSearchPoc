function TireSearchParams(width, aspRatio, rim) {
    this.DealerGroupId = "ADF3ABD9-0C2C-4176-A117-03EAEDDA4AB0";
    this.DealerId = 339;
    if (width) {
        this.Width = width.toString();
    } else {
        this.Width = "235";
    }

    if (aspRatio) {
        this.AspRatio = aspRatio.toString();
    } else {
        this.AspRatio = "75";
    }

    if (rim) {
        this.Rim = rim.toString();
    } else {
        this.Rim = "16";
    }

    this.LoadRating = "";
    this.SpeedRation = "";
    this.Width2 = null;
    this.AspRation2 = null;
    this.Rim2 = null;
    this.LoadRating2 = "";
    this.SpeedRating2 = ""
}