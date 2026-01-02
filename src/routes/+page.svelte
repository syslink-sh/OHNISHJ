<script lang="ts">
    import { Ohnishj } from "$lib/ohnishj.js";

    let inputText = $state("");
    let outputText = $state("");
    let isEncoding = $state(true);

    function handleTranslate() {
        if (isEncoding) {
            outputText = Ohnishj.encode(inputText);
        } else {
            outputText = Ohnishj.decode(inputText);
        }
    }

    function swapMode() {
        isEncoding = !isEncoding;
    }

    function copyToClipboard() {
        if (outputText) {
            navigator.clipboard.writeText(outputText);
        }
    }

    function clearAll() {
        inputText = "";
        outputText = "";
    }
</script>

<div class="editorial-wrapper">
    <header class="page-header">
        <h1 class="main-title">OHNISHJ</h1>
    </header>

    <section class="controls">
        <div class="mode-toggle">
            <span class="mode-label" class:active={isEncoding}
                >English to OHNISHJ</span
            >
            <button
                class="small-btn swap"
                onclick={swapMode}
                aria-label="Toggle Direction"
            >
                ⇆
            </button>
            <span class="mode-label" class:active={!isEncoding}
                >OHNISHJ to English</span
            >
        </div>
    </section>

    <div class="editor-grid">
        <div class="field-entry">
            <label for="input-area" class="field-label">Source Text</label>
            <textarea
                id="input-area"
                bind:value={inputText}
                oninput={handleTranslate}
                placeholder={isEncoding
                    ? "Enter your text here..."
                    : "Enter encoded sequence..."}
            ></textarea>
        </div>

        <div class="field-entry">
            <label for="output-area" class="field-label">Transformed Text</label
            >
            <textarea
                id="output-area"
                bind:value={outputText}
                readonly
                placeholder="Output will appear here..."
            ></textarea>
        </div>

        <div class="action-row">
            <button
                class="action-text-btn"
                onclick={copyToClipboard}
                disabled={!outputText}>Copy Output</button
            >
            <button class="action-text-btn" onclick={clearAll}>Clear All</button
            >
        </div>
    </div>
</div>

<style>
    .editorial-wrapper {
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }

    .page-header {
        text-align: center;
        padding-bottom: 2rem;
        margin-bottom: 2rem;
    }

    .main-title {
        font-family: var(--font-sans);
        font-size: 1.5rem;
        font-weight: 900;
        letter-spacing: 0.5em;
        text-transform: uppercase;
        color: var(--color-text);
        margin: 0;
    }

    .controls {
        padding: 1rem 0;
        border-bottom: 1px solid var(--color-border);
    }

    .mode-toggle {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        font-family: var(--font-sans);
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    .mode-label {
        color: var(--color-muted);
        transition: color 0.2s;
    }

    .mode-label.active {
        color: var(--color-text);
        font-weight: bold;
    }

    .small-btn.swap {
        background: none;
        border: 1px solid var(--color-border);
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-text);
        border-radius: 2px;
    }

    .small-btn.swap:hover {
        background-color: var(--color-text);
        color: var(--color-bg);
    }

    .editor-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }

    .field-entry {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .field-label {
        font-family: var(--font-sans);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        color: var(--color-muted);
    }

    textarea {
        width: 100%;
        height: 180px;
        background: var(--color-paper);
        border: 1px solid var(--color-border);
        padding: 1.5rem;
        font-size: 1.1rem;
        color: var(--color-text);
        resize: none;
        outline: none;
        border-radius: 0;
        transition: border-color 0.2s;
    }

    textarea:focus {
        border-color: var(--color-accent);
    }

    textarea::placeholder {
        color: var(--color-muted);
        opacity: 0.4;
        font-style: italic;
    }

    .action-row {
        grid-column: 1 / -1;
        display: flex;
        justify-content: flex-end;
        gap: 2rem;
        padding-top: 1rem;
    }

    .action-text-btn {
        background: none;
        border: none;
        font-family: var(--font-sans);
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--color-text);
        text-decoration: underline;
        padding: 0;
    }

    .action-text-btn:hover:not(:disabled) {
        color: var(--color-muted);
    }

    .action-text-btn:disabled {
        color: var(--color-muted);
        opacity: 0.5;
        text-decoration: none;
        cursor: not-allowed;
    }

    @media (max-width: 900px) {
        .editor-grid {
            grid-template-columns: 1fr;
        }

        .main-title {
            font-size: 1.2rem;
            letter-spacing: 0.3em;
        }

        .action-row {
            justify-content: center;
            gap: 1.5rem;
        }
    }
</style>
