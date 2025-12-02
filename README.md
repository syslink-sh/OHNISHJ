<img style="width: 128px; height: 128px" src="gh-images/logo.png alt="OHNISHJ Translator Logo" />

# OHNISHJ Translator

A text encoding/decoding tool that converts text to and from the OHNISHJ format.

[View the website](https://ohnishj.syslink.dev)

## About

The OHNISHJ Translator is a browser-based tool that encodes text using a word scrambling algorithm. It rearranges sentences by moving the subject to the end and scrambling individual words.

## Features

- **Encode** - Convert plain text to OHNISHJ format
- **Decode** - Convert OHNISHJ text back to plain text

## How It Works

The OHNISHJ encoding system works by:

1. Scrambling each word by moving the first letter to the end
2. Identifying the sentence split point (typically at the main verb)
3. Rearranging the sentence by moving the subject to the end
4. Placing a `>` marker between the verb/object and the subject

**Example:**
- Input: `The cat jumps`
- Word scrambling: `heT atc umpsj`
- Sentence rearrangement: `umpsj> heT atc`
- Result: The verb/object comes first, followed by `>`, then the subject

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
2. Paste OHNISHJ text (must contain the `>` marker)
3. Click **Decode** or press `Ctrl+Enter`
4. Copy the decoded output using the **Copy** button

**Note:** The Aero effect requires browsers with backdrop-filter support. Older browsers will show a solid background instead.

---