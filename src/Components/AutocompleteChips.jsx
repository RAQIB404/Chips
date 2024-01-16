import React, { useState } from "react";
import "./autocompletechips.css"

const AutocompleteChips = () => {
    const [inputValue, setInputValue] = useState("");
    const [isInputFocused, setInputFocused] = useState(false);
    const [items, setItems] = useState([
        {
            name: "Nick Jhonas",
            avatar: "https://randomuser.me/api/portraits/men/75.jpg",
            email: "nickjhonas@gmail.com",
        },
        {
            name: "Jhone Doe",
            avatar: "https://randomuser.me/api/portraits/men/76.jpg",
            email: "jhonedoe@gmail.com",
        },
        {
            name: "Marina Agusteine",
            avatar: "https://randomuser.me/api/portraits/women/74.jpg",
            email: "mariana@gmail.com",
        },
        {
            name: "Anita Gros",
            avatar: "https://randomuser.me/api/portraits/women/73.jpg",
            email: "anitagros@gmail.com",
        },
        {
            name: "Narayan Gamer",
            avatar: "https://randomuser.me/api/portraits/men/72.jpg",
            email: "narayan@gmail.com",
        },
        {
            name: "Megan Smith",
            avatar: "https://randomuser.me/api/portraits/women/71.jpg",
            email: "megan@gmail.com",
        },
        {
            name: "Jane Smith",
            avatar: "https://randomuser.me/api/portraits/women/70.jpg",
            email: "janesmith@gmail.com",
        },
    ]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [highlightedChipIndex, setHighlightedChipIndex] = useState(null);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleItemClick = (item) => {
        // Add the selected item to the chips and remove it from the list
        setSelectedItems([...selectedItems, item]);
        setItems(items.filter((i) => i !== item));
        setInputValue("");
        setInputFocused(false);
    };

    const handleChipRemove = (item) => {
        // Remove the chip and add the item back to the list
        setSelectedItems(selectedItems.filter((i) => i !== item));
        setItems([...items, item]);
    };

    const handleInputBackspace = () => {
        if (inputValue === "") {
          if (selectedItems.length > 0) {
            // If there is a highlighted chip, remove it
            if (highlightedChipIndex !== null) {
              const removedChip = selectedItems.splice(highlightedChipIndex, 1)[0];
              setItems([...items, removedChip]);
              setHighlightedChipIndex(null);
            } else {
              // If no chip is highlighted, highlight the last chip
              setHighlightedChipIndex(selectedItems.length - 1);
            }
          }
        }
      };

    return (
        <div className="container">
            <h2 className="pick">Pick Users</h2>
            <div className="tj">
                {selectedItems.map((item, index) => (
                    <div
                    key={index}
                    className={`chip ${index === highlightedChipIndex ? 'chip-highlighted' : ''}`}
                  >
                        <img src={item.avatar} alt="" className="avatar" />
                        <div>
                            {item.name}</div>
                        <div
                            onClick={() => handleChipRemove(item)}
                            className="chip-remove"
                        >
                            X
                        </div>
                    </div>
                ))}
                <div style={{ position: "relative" }}>
                    <input
                        onFocus={() => setInputFocused(true)}
                        type="text"
                        placeholder="Add new user..."
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.key === "Backspace" && handleInputBackspace()}
                    />
                    {isInputFocused &&
                        <ul style={{ position: "absolute", top: 20 }} className="scrollable-list">
                            {items.filter((item) =>
                                item.name.toLowerCase().includes(inputValue.toLowerCase())
                            ).map((item, index) => (
                                <li key={index} onClick={() => handleItemClick(item)} className="list-item">
                                    <div className="autocomplete-item">
                                        <div className="img-name">
                                            <img src={item.avatar} alt={item.name} className="avatar" />
                                            <div className="name">{item.name} </div>
                                        </div>
                                        <div className="email">{item.email}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    }
                </div>
            </div>
        </div>
    );
};

export default AutocompleteChips;
