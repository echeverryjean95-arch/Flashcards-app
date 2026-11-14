(function () {
  const STORAGE_KEY = "flashcards.state";
  const STORAGE_VERSION = 1;
  const DEFAULT_STATE = {
    decks: [
      {
        id: 1,
        name: "Example deck",
        cards: [{ id: 1, front: "What is HTML?", back: "A markup language for the web." }]
      }
    ],
    selectedDeckId: 1
  };

  function createDefaultState() {
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  function isValidState(state) {
    if (
      !state ||
      typeof state !== "object" ||
      !Array.isArray(state.decks) ||
      !(state.selectedDeckId === null || Number.isSafeInteger(state.selectedDeckId))
    ) {
      return false;
    }

    const deckIds = new Set();
    const cardIds = new Set();
    for (const deck of state.decks) {
      if (
        !deck ||
        !Number.isSafeInteger(deck.id) ||
        typeof deck.name !== "string" ||
        !Array.isArray(deck.cards) ||
        deckIds.has(deck.id)
      ) {
        return false;
      }
      deckIds.add(deck.id);

      for (const card of deck.cards) {
        if (
          !card ||
          !Number.isSafeInteger(card.id) ||
          typeof card.front !== "string" ||
          typeof card.back !== "string" ||
          cardIds.has(card.id)
        ) {
          return false;
        }
        cardIds.add(card.id);
      }
    }

    return state.selectedDeckId === null || deckIds.has(state.selectedDeckId);
  }

  function loadState() {
    let serialized;
    try {
      serialized = localStorage.getItem(STORAGE_KEY);
    } catch {
      throw new Error("Unable to read flashcards from browser storage.");
    }

    if (serialized === null) {
      return createDefaultState();
    }

    let stored;
    try {
      stored = JSON.parse(serialized);
    } catch {
      throw new Error("Saved flashcard data is corrupted and could not be read.");
    }

    if (
      !stored ||
      stored.version !== STORAGE_VERSION ||
      !isValidState(stored.state)
    ) {
      throw new Error("Saved flashcard data has an unsupported version or invalid format.");
    }

    return stored.state;
  }

  function saveState(state) {
    if (!isValidState(state)) {
      throw new TypeError("Cannot save invalid flashcard state.");
    }

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: STORAGE_VERSION, state })
      );
    } catch {
      throw new Error("Unable to save flashcards to browser storage. Check availability and free space.");
    }
  }

  window.FlashcardStorage = { createDefaultState, loadState, saveState };
})();
