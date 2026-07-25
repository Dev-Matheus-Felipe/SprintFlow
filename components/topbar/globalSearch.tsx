import { Search, X } from "lucide-react";
import { useState } from "react";

export default function GlobalSearch(){
    const [focused, setFocused] = useState<Boolean>(false);
    const [search, setSearch] = useState<string>("");

    return (
        <div 
            onClick={()=> setFocused(true)}
            className={`flex gap-3 items-center bg-(--card) py-2 px-2 rounded relative`}
        >
            <Search size={16} color="var(--muted-foreground)" />

            <input 
                className={`text-sm text-(--muted-foreground) outline-0 ${focused ? "w-50" : "w-20"}`}
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search" 

            />

            
        </div>
    )
}