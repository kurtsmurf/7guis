import { useEffect, useReducer, useState } from "preact/hooks";

export function CRUD() {
  type fullName = {
    name: string;
    surname: string;
  };

  type person = {
    id: number;
    fullName: fullName;
  };

  type crudState = {
    nextId: number;
    persons: person[];
  };

  type crudEvent =
    | { type: "CREATE"; fullName: fullName }
    | { type: "UPDATE"; person: person }
    | { type: "DELETE"; personId: number };

  const initialState = {
    nextId: 0,
    persons: [],
  };

  const reducer = (state: crudState, event: crudEvent) => {
    switch (event.type) {
      case "CREATE": {
        return {
          ...state,
          nextId: state.nextId + 1,
          persons: [
            ...state.persons,
            {
              id: state.nextId,
              fullName: event.fullName,
            },
          ],
        };
      }
      case "DELETE": {
        return {
          ...state,
          persons: state.persons.filter((p) => p.id !== event.personId),
        };
      }
      case "UPDATE": {
        return {
          ...state,
          persons: state.persons.map((p) =>
            p.id === event.person.id ? event.person : p
          ),
        };
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [selected, setSelected] = useState(-1);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const selectedPerson = state.persons.find((p) => p.id === selected);
    setName(selectedPerson?.fullName.name || "");
    setSurname(selectedPerson?.fullName.surname || "");
  }, [selected]);

  const createPerson = () => {
    dispatch({
      type: "CREATE",
      fullName: { name, surname },
    });
    setSelected(state.nextId);
  };

  const updatePerson = () =>
    dispatch({
      type: "UPDATE",
      person: {
        id: selected,
        fullName: { name, surname },
      },
    });

  const deletePerson = () => {
    dispatch({ type: "DELETE", personId: selected });
    setSelected(-1);
  };

  const handleNameInput = (e: Event) => {
    const nameInput = e.target as HTMLInputElement;
    setName(nameInput.value);
  };

  const handleSurnameInput = (e: Event) => {
    const surnameInput = e.target as HTMLInputElement;
    setSurname(surnameInput.value);
  };

  const handleFilterInput = (e: Event) => {
    const filterInput = e.target as HTMLInputElement;
    setFilter(filterInput.value);
  };

  return (
    <div class="task stack">
      <h3>CRUD</h3>
      <div className="row row-right">
        <label htmlFor="filter">Filter prefix:</label>
        <input
          onInput={handleFilterInput}
          type="text"
          name="filter"
          id="filter"
          value={filter}
        />
      </div>
      <select
        name="persons"
        id="persons"
        multiple
        onInput={(e) => {
          const select = e.target as HTMLInputElement;
          setSelected(parseFloat(select.value));
        }}
      >
        {state.persons
          .filter((person) =>
            !!filter ? person.fullName.surname.startsWith(filter) : true
          )
          .map((person) => (
            <option value={person.id} selected={person.id === selected}>
              {person.fullName.surname}, {person.fullName.name}
            </option>
          ))}
      </select>
      <div className="row row-right">
        <label htmlFor="name">Name:</label>
        <input
          onInput={handleNameInput}
          type="text"
          name="name"
          id="name"
          value={name}
        />
      </div>
      <div className="row row-right">
        <label htmlFor="surname">Surname:</label>
        <input
          onInput={handleSurnameInput}
          type="text"
          name="surname"
          id="surname"
          value={surname}
        />
      </div>
      <button onClick={createPerson}>create</button>
      <button onClick={updatePerson} disabled={selected < 0}>update</button>
      <button onClick={deletePerson} disabled={selected < 0}>delete</button>
    </div>
  );
}
