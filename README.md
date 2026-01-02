<img style="width: 128px; height: 128px" src="gh-images/logo.png" alt="OHNISHJ Translator Logo"/>

## OHNISHJ Translator

A text encoding/decoding tool that converts text to and from the OHNISHJ format.

[View the website](https://ohnishj.syslink.dev)

## About

The OHNISHJ Translator is a browser-based tool that encodes text using a word scrambling algorithm. It rearranges sentences by moving the subject to the end and scrambling individual words, creating a unique reversible linguistic pattern.

## Features

- **Reversible Encoding** - Convert English sentences into the OHNISHJ format.
- **Directional Decoding** - Restore original text from the OHNISHJ format.
- **Side-by-Side Interface** - View source and transformed text simultaneously for better clarity.
- **Modern-Classic Aesthetic** - A timeless, editorial design focused on typography and clarity.

## How It Works

The OHNISHJ encoding system works by:

1. **Word Scrambling**: Moving the first letter of each word to its end.
2. **Verb Splitting**: Identifying the primary split point (typically the main verb).
3. **Restructuring**: Moving the subject (everything before the split) to the end of the sentence.
4. **Marking**: Placing a `>` delimiter between the verb/object cluster and the subject.

**Example:**
- **Input**: `The cat jumps`
- **Word scrambling**: `heT atc umpsj`
- **Restructuring**: `umpsj> heT atc`

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Encoding
1. Ensure the mode is set to **English to OHNISHJ**.
2. Type or paste your text in the **Source Text** area.
3. The result appears instantly in the **Transformed Text** area.

### Decoding
1. Click the toggle button to switch to **OHNISHJ to English**.
2. Paste OHNISHJ text (containing the `>` marker).
3. The original English text will be restored.

---