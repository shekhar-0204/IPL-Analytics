const fs = require("fs");
const path = require("path");
const readline = require("readline");

const inputFile = path.join(__dirname, "../data/IPL.csv");
const outputDir = path.join(__dirname, "../data/seasons");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const streams = {};
const firstRow = {};

console.log("Reading IPL.csv...");
console.log("Please wait...\n");

const rl = readline.createInterface({
  input: fs.createReadStream(inputFile),
  crlfDelay: Infinity,
});

let headers = [];
let rowNumber = 0;

rl.on("line", (line) => {
  rowNumber++;

  // First line contains column names
  if (rowNumber === 1) {
    headers = parseCSVLine(line);
    return;
  }

  if (!line.trim()) return;

  const values = parseCSVLine(line);

  const row = {};

  headers.forEach((header, index) => {
    row[header] = values[index] ?? "";
  });

  const season = row.season;

  if (!season) return;

  const safeSeason = season.replace(/\//g, "-");

  // Create file for season if it doesn't exist
  if (!streams[season]) {
    const outputFile = path.join(
      outputDir,
      `${safeSeason}.json`
    );

    streams[season] = fs.createWriteStream(outputFile);

    firstRow[season] = true;

    streams[season].write("[\n");

    console.log(`Created: ${safeSeason}.json`);
  }

  if (!firstRow[season]) {
    streams[season].write(",\n");
  }

  streams[season].write(JSON.stringify(row));

  firstRow[season] = false;
});

rl.on("close", () => {
  Object.keys(streams).forEach((season) => {
    streams[season].write("\n]");
    streams[season].end();
  });

  console.log("\n--------------------------------");
  console.log("CSV → JSON conversion completed!");
  console.log("--------------------------------");
  console.log(`Total rows processed: ${rowNumber - 1}`);
  console.log(`Output folder: ${outputDir}`);
});

// Basic CSV parser that handles commas inside quotes
function parseCSVLine(line) {
  const result = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (
        insideQuotes &&
        line[i + 1] === '"'
      ) {
        current += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);

  return result;
}