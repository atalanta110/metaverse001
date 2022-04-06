// import {Counter} from "./features/counter/Counter"
import Home from "./pages/Home";
import Market from "./pages/Market";
import BuyNft from "./pages/BuyNft";
import Event from "./pages/Event";
import ShareEvent from "./pages/ShareEvent";

import homeIcon from "./assets/images/sidebar/Home.svg";
import marketIcon from "./assets/images/sidebar/store.svg";
import mapIcon from "./assets/images/sidebar/map-marked.svg";
import createIcon from "./assets/images/sidebar/paint-brush.svg";
import walletIcon from "./assets/images/sidebar/wallet.svg";
import eventsIcon from "./assets/images/sidebar/glass-cheers.svg";
import blogIcon from "./assets/images/sidebar/pen-alt.svg";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Create from "./pages/Create";
import Map from "./Components/Map";
import Trailer from "./pages/Trailer";
import Profilepage from "./pages/Profilepage";
import ProfileMobile from "./pages/ProfileMobile";
import Play from "./pages/Play";
import RoadMap from "./pages/RoadMap";

// Pages seo
import HomeSEO from "./seo/Home";
import MapSEO from "./seo/Map";
import MarketSEO from "./seo/Market";
import RoadMapSEO from "./seo/Roadmap";
import WalletSEO from "./seo/Wallet";

export const Routes = () => { };

Routes.container = [
  {
    title: "home",
    path: "/",
    Component: Home,
    svg: homeIcon,
    tooltip: "Home",
    SEO: HomeSEO,
  },
  {
    title: "map",
    Component: Map,
    path: "/map",
    svg: mapIcon,
    tooltip: "Map",
    SEO: MapSEO,
  },
  {
    title: "trailer",
    Component: Trailer,
    path: "/trailer",
    tooltip: "trailer",
    hidden: true,
    svg: "",
    SEO: HomeSEO,
  },
  {
    title: "market",
    Component: Market,
    path: "/market",
    svg: marketIcon,
    tooltip: "Market Place",
    SEO: MarketSEO,
  },
  {
    title: "wallet",
    Component: Profilepage,
    path: "/profile/profile",
    svg: walletIcon,
    tooltip: "Wallet",
    SEO: WalletSEO,
  },
  {
    title: "create",
    Component: Create,
    path: "",
    svg: createIcon,
    tooltip: "Create",
    SEO: HomeSEO,
  },
  {
    title: "events",
    Component: Event,
    path: "",
    svg: eventsIcon,
    tooltip: "Events",
    SEO: HomeSEO,
  },
  {
    title: "blog",
    Component: Blog,
    path: "",
    svg: blogIcon,
    tooltip: "Blog",
    SEO: HomeSEO
  },
  {
    title: "play",
    Component: Play,
    path: "/play",
    svg: blogIcon,
    hidden: true,
    tooltip: "Play",
    SEO: HomeSEO,
  },
  {
    title: "roadMap",
    Component: RoadMap,
    path: "/roadmap",
    svg: blogIcon,
    hidden: true,
    tooltip: "RoadMap",
    SEO: RoadMapSEO,
  },
  {
    title: "profileMobile",
    Component: ProfileMobile,
    path: "/profileMobile",
    svg: blogIcon,
    hidden: true,
    tooltip: "Profile",
    SEO: HomeSEO,
  },
  {
    title: "market-item",
    Component: BuyNft,
    path: "/market/item/:id",
    svg: blogIcon,
    hidden: true,
    tooltip: "Buy in Market",
    SEO: HomeSEO,
  },
  {
    title: "shareEvent",
    Component: ShareEvent,
    path: "/shareevent/:id",
    svg: blogIcon,
    hidden: true,
    tooltip: "Share Event",
    SEO: HomeSEO,
  },
  {
    title: "blogPost",
    Component: BlogPost,
    path: "/blogPost/:id",
    svg: blogIcon,
    hidden: true,
    tooltip: "Post Blog",
    SEO: HomeSEO,
  },
  {
    title: "profile",
    Component: Profilepage,
    path: "/profile/:pagename",
    svg: blogIcon,
    hidden: true,
    tooltip: "Profile",
    SEO: HomeSEO,
  },
];
