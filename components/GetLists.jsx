

export const getLists = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/lists", {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      return res.json();
    } catch (error) {
      console.log("Error loading lists:", error);
       return { lists: [] };
    }
  };
  