import { setupNavigation } from "./components/navigation.js";
import { setupCatalog } from "./pages/catalog.js";
import { setupWhatsAppButton } from "./services/whatsappService.js";
import { setupIntroVideo } from "./components/introVideo.js";
import { setupRevealAnimations } from "./components/reveal.js";
import { setupAccordion } from "./components/accordion.js";
import { setupPurposeToggle } from "./components/purpose.js";
import { setupPageEnhancements } from "./components/pageEnhancements.js";
import { setupSelectionDrawer } from "./components/selectionDrawer.js";
import { setupMegaMenu } from "./components/megaMenu.js";
import { setupIcons } from "./components/icons.js";
function startApplication() {
  setupIcons();
  setupIntroVideo();
  setupNavigation();
  setupMegaMenu();
  setupCatalog();
  setupSelectionDrawer();
  setupWhatsAppButton();
  setupRevealAnimations();
  setupAccordion();
  setupPurposeToggle();
  setupPageEnhancements();
  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = new Date().getFullYear();
}
document.addEventListener("DOMContentLoaded", startApplication);
