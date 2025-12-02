<img style="width: 128px; height: 128px" src="favicon.png" alt="OHNISHJ Translator Logo" />

# OHNISHJ Translator

A text encoding/decoding tool that converts text to and from the OHNISHJ format using a Windows 7 Aero interface.

[View the website](https://ohnishj.syslink.dev)

## About

The OHNISHJ Translator is a browser-based tool that encodes ASCII text into a special format using the letters J, O, H, and N. Each letter's case (uppercase or lowercase) represents binary bits, creating a unique text representation.

## Features

- **Encode** - Convert plain text to OHNISHJ format
- **Decode** - Convert OHNISHJ text back to plain text
- **Real-time Processing** - Instant encoding and decoding

## How It Works

The OHNISHJ encoding system works by:

1. Converting each character to 7-bit ASCII binary
2. Padding to 8 bits
3. Splitting into 4-bit chunks
4. Mapping each chunk to the word "john" where:
   - Uppercase letter = 1
   - Lowercase letter = 0

**Example:**
- Input: `Hi`
- Binary: `1001000` (H) + `1101001` (i)
- Encoded: `JOHn john jOHN joHn`

## Getting Started
Simply open `index.html` in a web browser. No installation or build process required.

### Prerequisites
- Web browser with JavaScript enabled
- Support for CSS backdrop-filter (for aero effect)


## Usage

### Encoding Text

1. Click the **Encode** tab
2. Type or paste your text in the input field
3. Click **Encode** or press `Ctrl+Enter`
4. Copy the output using the **Copy** button

### Decoding Text

1. Click the **Decode** tab
2. Paste OHNISHJ text (only letters j, o, h, n allowed)
3. Click **Decode** or press `Ctrl+Enter`
4. Copy the decoded output using the **Copy** button

**Note:** The Aero effect requires browsers with backdrop-filter support. Older browsers will show a solid background instead.

---