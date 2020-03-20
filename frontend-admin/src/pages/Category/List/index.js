import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import api from "~/services/api";

import { TableContainer, TableActions, TableLoading } from "~/components/Table";
import { Header } from "~/components/Dashboard";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await api.get("category", {
          params: {
            q
          }
        });

        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error("Não foi possível carregar as informações das categorias");
      }
    }

    loadCategories();
  }, [q]);

  return (
    <>
      <Header title="Categorias" route="category" q={q} setQ={setQ} />

      {loading ? (
        <TableLoading />
      ) : (
        <TableContainer>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td>#{category.id}</td>
                <td>{category.name}</td>
                <TableActions
                  id={category.id}
                  route="category"
                  list={categories}
                  setList={setCategories}
                />
              </tr>
            ))}
          </tbody>
        </TableContainer>
      )}
    </>
  );
}
