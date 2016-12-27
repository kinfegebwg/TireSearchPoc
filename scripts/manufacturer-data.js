var ManufacturerData = (function($) {
    var manufacturerData =
        [
      {
          "token": "acura",
          "value": "Acura"
      },
      {
          "token": "alfa romeo",
          "value": "Alfa Romeo"
      },
      {
          "token": "am general",
          "value": "AM General"
      },
      {
          "token": "amg",
          "value": "AM General"
      },
      {
          "token": "american motors",
          "value": "American Motors"
      },
      {
          "token": "aston martin",
          "value": "Aston Martin"
      },
      {
          "token": "audi",
          "value": "Audi"
      },
      {
          "token": "avanti",
          "value": "Avanti"
      },
      {
          "token": "bentley",
          "value": "Bentley"
      },
      {
          "token": "bertone",
          "value": "Bertone"
      },
      {
          "token": "bmw",
          "value": "BMW"
      },
      {
          "token": "bugatti",
          "value": "Bugatti"
      },
      {
          "token": "buick",
          "value": "Buick"
      },
      {
          "token": "cadillac",
          "value": "Cadillac"
      },
      {
          "token": "checker",
          "value": "Checker"
      },
      {
          "token": "chevy",
          "value": "Chevrolet"
      },
      {
          "token": "chevrolet",
          "value": "Chevrolet"
      },
      {
          "token": "chrysler",
          "value": "Chrysler"
      },
      {
          "token": "coda",
          "value": "Coda"
      },
      {
          "token": "daewoo",
          "value": "Daewoo"
      },
      {
          "token": "daihatsu",
          "value": "Daihatsu"
      },
      {
          "token": "delorean",
          "value": "DeLorean"
      },
      {
          "token": "dodge",
          "value": "Dodge"
      },
      {
          "token": "eagle",
          "value": "Eagle"
      },
      {
          "token": "ferrari",
          "value": "Ferrari"
      },
      {
          "token": "fiat",
          "value": "Fiat"
      },
      {
          "token": "fisker",
          "value": "Fisker"
      },
      {
          "token": "ford",
          "value": "Ford"
      },
      {
          "token": "freightliner",
          "value": "Freightliner"
      },
      {
          "token": "geo",
          "value": "Geo"
      },
      {
          "token": "gmc",
          "value": "GMC"
      },
      {
          "token": "honda",
          "value": "Honda"
      },
      {
          "token": "hummer",
          "value": "Hummer"
      },
      {
          "token": "hyundai",
          "value": "Hyundai"
      },
      {
          "token": "infiniti",
          "value": "Infiniti"
      },
      {
          "token": "international",
          "value": "International"
      },
      {
          "token": "isuzu",
          "value": "Isuzu"
      },
      {
          "token": "jaguar",
          "value": "Jaguar"
      },
      {
          "token": "jeep",
          "value": "Jeep"
      },
      {
          "token": "kia",
          "value": "Kia"
      },
      {
          "token": "lamborghini",
          "value": "Lamborghini"
      },
      {
          "token": "lancia",
          "value": "Lancia"
      },
      {
          "token": "land rover",
          "value": "Land Rover"
      },
      {
          "token": "lexus",
          "value": "Lexus"
      },
      {
          "token": "lincoln",
          "value": "Lincoln"
      },
      {
          "token": "lotus",
          "value": "Lotus"
      },
      {
          "token": "maserati",
          "value": "Maserati"
      },
      {
          "token": "maybach",
          "value": "Maybach"
      },
      {
          "token": "mazda",
          "value": "Mazda"
      },
      {
          "token": "mclaren",
          "value": "McLaren"
      },
      {
          "token": "mercedes-benz",
          "value": "Mercedes-Benz"
      },
      {
          "token": "mercury",
          "value": "Mercury"
      },
      {
          "token": "merkur",
          "value": "Merkur"
      },
      {
          "token": "mg",
          "value": "MG"
      },
      {
          "token": "mini",
          "value": "Mini"
      },
      {
          "token": "mitsubishi",
          "value": "Mitsubishi"
      },
      {
          "token": "mobility ventures",
          "value": "Mobility Ventures"
      },
      {
          "token": "nissan",
          "value": "Nissan"
      },
      {
          "token": "oldsmobile",
          "value": "Oldsmobile"
      },
      {
          "token": "panoz",
          "value": "Panoz"
      },
      {
          "token": "peugeot",
          "value": "Peugeot"
      },
      {
          "token": "pininfarina",
          "value": "Pininfarina"
      },
      {
          "token": "plymouth",
          "value": "Plymouth"
      },
      {
          "token": "pontiac",
          "value": "Pontiac"
      },
      {
          "token": "porsche",
          "value": "Porsche"
      },
      {
          "token": "ram",
          "value": "RAM"
      },
      {
          "token": "renault",
          "value": "Renault"
      },
      {
          "token": "rolls-royce",
          "value": "Rolls-Royce"
      },
      {
          "token": "saab",
          "value": "Saab"
      },
      {
          "token": "saleen",
          "value": "Saleen"
      },
      {
          "token": "saturn",
          "value": "Saturn"
      },
      {
          "token": "scion",
          "value": "Scion"
      },
      {
          "token": "smart",
          "value": "Smart"
      },
      {
          "token": "srt",
          "value": "SRT"
      },
      {
          "token": "sterling",
          "value": "Sterling"
      },
      {
          "token": "subaru",
          "value": "Subaru"
      },
      {
          "token": "suzuki",
          "value": "Suzuki"
      },
      {
          "token": "tesla",
          "value": "Tesla"
      },
      {
          "token": "toyota",
          "value": "Toyota"
      },
      {
          "token": "triumph",
          "value": "Triumph"
      },
      {
          "token": "vw",
          "value": "Volkswagen"
      },
      {
          "token": "volkswagen",
          "value": "Volkswagen"
      },
      {
          "token": "volvo",
          "value": "Volvo"
      },
      {
          "token": "vpg",
          "value": "VPG"
      },
      {
          "token": "yugo",
          "value": "Yugo"
      }
        ];

    return manufacturerData;
})(jQuery);