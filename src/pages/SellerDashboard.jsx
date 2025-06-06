import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importera useNavigate
import { useAuth } from "../context/AuthContext";
import { getDishesBySellerId, deleteDishFromFirestore, updateDishInFirestore } from "../services/dishService";
import { addDishToFirestore } from "../services/addDishToFirestore"; // Importera addDishToFirestore från rätt fil
import DishCard from "../components/DishCard"; // Importera DishCard
import Button from "../components/form/Button"; // Importera Button
import Modal from "../components/Modal"; // Importera Modal
import DishForm from "../components/DishForm"; // Importera DishForm
import { Utensils, PlusCircle, AlertTriangle, ListChecks } from "lucide-react"; // Importera ikoner

export default function SellerDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [sellerDishes, setSellerDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook för navigering

  // State för modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingDishData, setEditingDishData] = useState(null); // null för ny, objekt för redigering
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [dishToDelete, setDishToDelete] = useState({ id: null, title: "" });

  useEffect(() => {
    const fetchSellerDishes = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false);
        // Inte nödvändigtvis ett fel, ProtectedRoute hanterar detta,
        // men bra att inte försöka hämta data om ingen användare finns.
        return;
      }

      try {
        setLoading(true);
        const dishes = await getDishesBySellerId(user.uid);
        setSellerDishes(dishes);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch seller dishes:", err);
        setError("Kunde inte ladda dina maträtter. Försök igen senare.");
      } finally {
        setLoading(false);
      }
    };

    fetchSellerDishes();
  }, [isAuthenticated, user]); // Körs om när inloggningsstatus eller användare ändras

  // ProtectedRoute bör hantera omdirigering om inte autentiserad
  if (loading) return <p className="p-4 text-center">Laddar dina maträtter...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;

  // Funktioner för formulärmodal
  const handleOpenAddForm = () => {
    setEditingDishData(null); // Ingen initial data för ny rätt
    setIsFormModalOpen(true);
  };

  const handleOpenEditForm = (dish) => {
    setEditingDishData(dish);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingDishData(null);
  };

  const handleFormSubmit = async (submittedDishData) => {
    // Sätt ett laddnings-state för dashboarden eller modalen om du vill
    // setLoading(true); // Kan behöva ett separat loading-state för formuläret
    setError(null); // Återställ eventuella tidigare fel

    try {
      if (editingDishData && editingDishData.id) {
        // Redigeringsläge
        await updateDishInFirestore(editingDishData.id, submittedDishData);
        // console.log("Maträtt uppdaterad!");
      } else {
        // Lägg till ny rätt-läge
        await addDishToFirestore(submittedDishData);
        // console.log("Maträtt tillagd!");
      }

      // Ladda om rätterna för att se ändringarna
      if (user) {
        const dishes = await getDishesBySellerId(user.uid);
        setSellerDishes(dishes);
      }
      handleCloseFormModal();
    } catch (err) {
      console.error("Fel vid sparande av maträtt:", err);
      setError("Kunde inte spara maträtten. Försök igen. " + err.message);
    }
  };

  // Funktioner för delete confirmation modal
  const handleOpenConfirmDeleteModal = (dishId, dishTitle) => {
    setDishToDelete({ id: dishId, title: dishTitle });
    setIsConfirmDeleteModalOpen(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setIsConfirmDeleteModalOpen(false);
    setDishToDelete({ id: null, title: "" });
  };

  const confirmDeleteDish = async () => {
    if (!dishToDelete.id) return;
    try {
      await deleteDishFromFirestore(dishToDelete.id);
      setSellerDishes(prevDishes => prevDishes.filter(dish => dish.id !== dishToDelete.id));
      // Kanske visa en notifikation om lyckad borttagning
    } catch (err) {
      console.error("Failed to delete dish:", err);
      setError(`Kunde inte ta bort rätten "${dishToDelete.title}". Försök igen.`);
      setTimeout(() => setError(null), 5000);
    } finally {
      handleCloseConfirmDeleteModal();
    }
  };


  const handleCardClick = (dishId) => {
    navigate(`/dish/${dishId}`); // Navigera till den vanliga detaljsidan
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-primary-main flex items-center">
          <Utensils className="mr-3 h-8 w-8" />
          Mina Maträtter
        </h1>
        <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/seller/orders"
          // Använd din Button-komponent eller styla Link direkt
          // För detta exempel använder vi Button-komponenten
          // Du kan behöva justera Button-komponenten för att acceptera `as={Link}` eller liknande
          // eller skapa en ny LinkButton-komponent.
          // Här är en enkel styling för Link:
          className="flex items-center justify-center text-sm font-semibold px-4 py-2 rounded-full border border-primary-main text-primary-main hover:bg-primary-main hover:text-white transition-colors"
        >
          <ListChecks className="mr-2 h-5 w-5" />
          Visa inkomna beställningar
        </Link>
        <Button
          onClick={handleOpenAddForm}
          variant="primary" // Eller en ny 'accent' variant om du skapar den
          className="bg-accent-DEFAULT text-textColors-onAccent hover:bg-accent-light flex items-center" // Lägg till flex items-center
        >
          <PlusCircle className="mr-2 h-5 w-5" /> Lägg till Ny Maträtt
        </Button>
        </div>
      </div>

      {sellerDishes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sellerDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onClick={() => handleCardClick(dish.id)} // Klick på kortet leder till detaljsida
              showAdminControls={true}
              onEdit={() => handleOpenEditForm(dish)}
              onDelete={() => handleOpenConfirmDeleteModal(dish.id, dish.title)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-pageTheme-card dark:bg-gray-700 rounded-lg shadow-md">
          <AlertTriangle className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
          <p className="text-xl text-gray-700 dark:text-gray-200">Du har inga aktiva maträtter.</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Klicka på "Lägg till Ny Maträtt" för att börja sälja.</p>
          <Button
            onClick={handleOpenAddForm}
            variant="primary"
            className="bg-accent-DEFAULT text-textColors-onAccent hover:bg-accent-light flex items-center" // Lägg till flex items-center
          >
            <PlusCircle className="mr-2 h-5 w-5" /> Skapa din första annons
          </Button>
        </div>
      )}

      {/* Modal för att lägga till/redigera maträtt */}
      {isFormModalOpen && (
        <Modal
          title={editingDishData ? "Redigera Maträtt" : "Lägg till Ny Maträtt"}
          onClose={handleCloseFormModal}
        >
          <DishForm
            initialData={editingDishData || {}} // Skicka tomt objekt om ny, annars data
            onSubmit={handleFormSubmit} // DishForm kommer att anropa denna efter sitt interna anrop till addDishToFirestore/updateDishInFirestore
            isEditMode={!!editingDishData}
            // onFormClose={handleCloseFormModal} // Om DishForm behöver en egen stängningsknapp
          />
        </Modal>
      )}

      {/* Modal för att bekräfta borttagning */}
      {isConfirmDeleteModalOpen && (
        <Modal
          title="Bekräfta Borttagning"
          onClose={handleCloseConfirmDeleteModal}
        >
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Är du säker på att du vill ta bort rätten "{dishToDelete.title}"? Denna åtgärd kan inte ångras.
          </p>
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={handleCloseConfirmDeleteModal}>Avbryt</Button>
            <Button variant="destructive_outline" onClick={confirmDeleteDish}>Ta bort</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
