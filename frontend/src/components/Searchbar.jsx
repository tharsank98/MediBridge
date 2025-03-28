import { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const Searchbar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <TextField
                variant="outlined"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
                className="w-64"
                size="small"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

// Add PropTypes validation
Searchbar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default Searchbar;