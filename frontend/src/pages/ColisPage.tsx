import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Typography, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField,
  Box,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { GET_ALL_COLIS, CREATE_COLIS, UPDATE_COLIS, REMOVE_COLIS } from '../services/graphql-operations';

interface Colis {
  id: number;
  destinataire: string;
  adresse: string;
  statut: string;
  expediteur: string;
  dateExpedition: string;
  numeroSuivi: string;
  poids: number;
  dateEstimeeLivraison?: string;
  commentaire?: string;
  type: string;
  valeurDeclaree?: number;
}

const initialFormState = {
  destinataire: '',
  adresse: '',
  statut: 'En attente',
  expediteur: '',
  dateExpedition: new Date().toISOString().split('T')[0],
  numeroSuivi: '',
  poids: 0,
  dateEstimeeLivraison: '',
  commentaire: '',
  type: 'Standard',
  valeurDeclaree: 0
};

const ColisPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const { loading, error, data, refetch } = useQuery(GET_ALL_COLIS);
  const [createColis] = useMutation(CREATE_COLIS);
  const [updateColis] = useMutation(UPDATE_COLIS);
  const [removeColis] = useMutation(REMOVE_COLIS);

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setFormData(initialFormState);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'poids' || name === 'valeurDeclaree' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async () => {
    try {
      if (editMode && currentId) {
        await updateColis({
          variables: {
            updateColisInput: {
              id: currentId,
              ...formData
            }
          }
        });
      } else {
        await createColis({
          variables: {
            createColisInput: formData
          }
        });
      }
      refetch();
      handleClose();
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleEdit = (colis: Colis) => {
    setEditMode(true);
    setCurrentId(colis.id);
    setFormData({
      destinataire: colis.destinataire,
      adresse: colis.adresse,
      statut: colis.statut,
      expediteur: colis.expediteur,
      dateExpedition: colis.dateExpedition.split('T')[0],
      numeroSuivi: colis.numeroSuivi,
      poids: colis.poids,
      dateEstimeeLivraison: colis.dateEstimeeLivraison ? colis.dateEstimeeLivraison.split('T')[0] : '',
      commentaire: colis.commentaire || '',
      type: colis.type,
      valeurDeclaree: colis.valeurDeclaree || 0
    });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce colis?')) {
      try {
        await removeColis({ variables: { id } });
        refetch();
      } catch (err) {
        console.error('Error deleting colis:', err);
      }
    }
  };

  if (loading) return <Typography>Chargement...</Typography>;
  if (error) return <Typography>Erreur: {error.message}</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>Gestion des Colis</Typography>
      
      <Button 
        variant="contained" 
        color="primary" 
        startIcon={<AddIcon />} 
        onClick={handleOpen}
        sx={{ mb: 2 }}
      >
        Ajouter un Colis
      </Button>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Destinataire</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Expéditeur</TableCell>
              <TableCell>N° Suivi</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.getAllColis.map((colis: Colis) => (
              <TableRow key={colis.id}>
                <TableCell>{colis.id}</TableCell>
                <TableCell>{colis.destinataire}</TableCell>
                <TableCell>{colis.adresse}</TableCell>
                <TableCell>{colis.statut}</TableCell>
                <TableCell>{colis.expediteur}</TableCell>
                <TableCell>{colis.numeroSuivi}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(colis)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(colis.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? 'Modifier le Colis' : 'Ajouter un Colis'}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  name="destinataire"
                  label="Destinataire"
                  fullWidth
                  value={formData.destinataire}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  name="expediteur"
                  label="Expéditeur"
                  fullWidth
                  value={formData.expediteur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  name="adresse"
                  label="Adresse"
                  fullWidth
                  value={formData.adresse}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  name="statut"
                  label="Statut"
                  fullWidth
                  value={formData.statut}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  name="numeroSuivi"
                  label="Numéro de Suivi"
                  fullWidth
                  value={formData.numeroSuivi}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  name="dateExpedition"
                  label="Date d'Expédition"
                  type="date"
                  fullWidth
                  value={formData.dateExpedition}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  name="dateEstimeeLivraison"
                  label="Date Estimée de Livraison"
                  type="date"
                  fullWidth
                  value={formData.dateEstimeeLivraison}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  name="poids"
                  label="Poids (kg)"
                  type="number"
                  fullWidth
                  value={formData.poids}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  name="type"
                  label="Type"
                  fullWidth
                  value={formData.type}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  name="valeurDeclaree"
                  label="Valeur Déclarée"
                  type="number"
                  fullWidth
                  value={formData.valeurDeclaree}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  name="commentaire"
                  label="Commentaire"
                  fullWidth
                  multiline
                  rows={3}
                  value={formData.commentaire}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSubmit} color="primary">
            {editMode ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ColisPage;