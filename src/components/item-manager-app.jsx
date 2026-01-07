import { useMemo, useState } from "react";

// icons are in src/assets, but this file is inside src/components
import deleteIcon from "../assets/delete.svg";
import inkPen from "../assets/ink_pen.svg";
import flatware from "../assets/flatware.svg";
import electricalServices from "../assets/electrical_services.svg";

const CATEGORIES = ["Stationary", "Kitchenware", "Appliance"];

const categoryIcon = {
  Stationary: inkPen,
  Kitchenware: flatware,
  Appliance: electricalServices,
};

export default function ItemManager() {
  // starter data (match the sample UI)
  const initialItems = useMemo(
    () => [
      { id: 1, name: "Color Pencil set 32", category: "Stationary", price: 11.99 },
      { id: 2, name: "Small Kitty Lamp", category: "Appliance", price: 44.88 },
      { id: 3, name: "Knife Set 4pcs", category: "Kitchenware", price: 23.11 },
    ],
    []
  );

  const [items, setItems] = useState(initialItems);

  // form inputs (no default category)
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);

  // error below table
  const [error, setError] = useState("");

  // auto-increment ID
  const [nextId, setNextId] = useState(
    initialItems.length ? Math.max(...initialItems.map((i) => i.id)) + 1 : 1
  );

  function handleDelete(id) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  function handleAdd() {
    const trimmed = name.trim();

    if (!trimmed) return setError("Item name must not be empty");

    const duplicated = items.some(
      (it) => it.name.trim().toLowerCase() === trimmed.toLowerCase()
    );
    if (duplicated) return setError("Item must not be duplicated");

    if (!CATEGORIES.includes(category)) return setError("Please select a category");

    if (Number(price) < 0) return setError("Price must not be less than 0");

    const newItem = { id: nextId, name: trimmed, category, price: Number(price) };

    setItems((prev) => [...prev, newItem]);
    setNextId((prev) => prev + 1);

    setName("");
    setCategory("");
    setPrice(0);
    setError("");
  }

  return (
    <div style={{ padding: 12 }}>
      <h2 style={{ marginBottom: 6 }}>Item Management</h2>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {["ID", "Name", "Category", "Price", "Action"].map((h) => (
              <th key={h} style={{ border: "1px solid #000", padding: 6, textAlign: "left" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td style={{ border: "1px solid #000", padding: 6 }}>{it.id}</td>
              <td style={{ border: "1px solid #000", padding: 6 }}>{it.name}</td>

              {/* category icon */}
              <td style={{ border: "1px solid #000", padding: 6 }}>
                <img
                  src={categoryIcon[it.category]}
                  alt={it.category}
                  style={{ width: 18, height: 18, verticalAlign: "middle" }}
                />
              </td>

              <td style={{ border: "1px solid #000", padding: 6 }}>{it.price.toFixed(2)}</td>

              {/* delete icon */}
              <td style={{ border: "1px solid #000", padding: 6 }}>
                <img
                  src={deleteIcon}
                  alt="delete"
                  style={{ width: 18, height: 18, cursor: "pointer" }}
                  onClick={() => handleDelete(it.id)}
                />
              </td>
            </tr>
          ))}

          {/* form row inside table */}
          <tr>
            <td style={{ border: "1px solid #000", padding: 6 }}></td>

            <td style={{ border: "1px solid #000", padding: 6 }}>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                style={{ width: "95%" }}
              />
            </td>

            <td style={{ border: "1px solid #000", padding: 6 }}>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setError("");
                }}
                style={{ width: "100%" }}
              >
                <option value=""></option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </td>

            <td style={{ border: "1px solid #000", padding: 6 }}>
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  setError("");
                }}
                style={{ width: "95%" }}
              />
            </td>

            <td style={{ border: "1px solid #000", padding: 6 }}>
              <button onClick={handleAdd}>Add Item</button>
            </td>
          </tr>
        </tbody>
      </table>

      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
    </div>
  );
}
