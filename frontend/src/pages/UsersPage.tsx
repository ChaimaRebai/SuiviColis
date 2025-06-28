import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Button, TextField, List, ListItem, ListItemText, Typography } from "@mui/material";

const USERS_QUERY = gql`
  query {
    users { id email nom prenom telephone adresse role }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) { id email nom }
  }
`;

export default function UsersPage() {
  const { data, loading, error, refetch } = useQuery(USERS_QUERY);
  const [createUser] = useMutation(CREATE_USER);
  const [form, setForm] = useState({ email: "", nom: "", prenom: "", telephone: "", adresse: "", role: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createUser({ variables: { input: form } });
    setForm({ email: "", nom: "", prenom: "", telephone: "", adresse: "", role: "" });
    refetch();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading users.</div>;

  return (
    <div>
      <Typography variant="h4">Users</Typography>
      <form onSubmit={handleSubmit} style={{ margin: "1em 0" }}>
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} required />
        <TextField label="Nom" name="nom" value={form.nom} onChange={handleChange} required />
        <TextField label="Prenom" name="prenom" value={form.prenom} onChange={handleChange} required />
        <TextField label="Telephone" name="telephone" value={form.telephone} onChange={handleChange} required />
        <TextField label="Adresse" name="adresse" value={form.adresse} onChange={handleChange} required />
        <TextField label="Role" name="role" value={form.role} onChange={handleChange} required />
        <Button type="submit" variant="contained">Add User</Button>
      </form>
      <List>
        {data.users.map((user: { id: string; nom: string; prenom: string; email: string }) => (
          <ListItem key={user.id}>
            <ListItemText primary={`${user.nom} ${user.prenom}`} secondary={user.email} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}