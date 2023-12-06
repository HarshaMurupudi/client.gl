import React, { lazy, Suspense } from "react";

import AppLayout from "../components/layouts/AppLayout";
import PrivateRoute from "../components/Utils/PrivateRoute";

const Home = lazy(() => import("../pages/home"));
const Login = lazy(() => import("../pages/login"));
const Mission = lazy(() => import("../pages/mission"));
const Contracts = lazy(() => import("../pages/contracts"));
const Operations = lazy(() => import("../pages/operations"));
const PO = lazy(() => import("../pages/po"));
const Tracking = lazy(() => import("../pages/tracking"));
const RequestPage = lazy(() => import("../pages/request-site"));
const EmployeeAttendance = lazy(() => import("../pages/attendance"));
const Meeting = lazy(() => import("../pages/meeting"));
const Training = lazy(() => import("../pages/training"));
const Dashboard = lazy(() => import("../pages/dashboard"));
const PendingJobs = lazy(() => import("../pages/pending"));
const DeliveryQueueDetails = lazy(
  () => import("../features/delivery-queue-details")
);
const MaterialRequirements = lazy(
  () => import("../pages/material-requirement")
);
const Shiplines = lazy(() => import("../features/shiplines/page"));
const AutoCreateFolders = lazy(() => import("../pages/auto-create"));
const Aart = lazy(() => import("../pages/a-art"));
const Hytech = lazy(() => import("../pages/hytech"));
const Qc = lazy(() => import("../pages/qc"));
const Eco = lazy(() => import("../pages/eco"));
const Fai = lazy(() => import("../pages/fai"));
const DScreens = lazy(() => import("../pages/d-screen"));
const ACustomer = lazy(() => import("../pages/a-customer"));
const PoReviewPage = lazy(() => import("../pages/po-review"));

const EInk = lazy(() => import("../pages/print/E-INK"));
const HCylinder = lazy(() => import("../pages/print/H-CYLINDER"));
const KDespatch = lazy(() => import("../pages/print/K-DESPATCH"));
const HSSSemi = lazy(() => import("../pages/screen-print/H-SS-SEMI"));

const FMaterial = lazy(() => import("../pages/f-material/F-MATERIAL"));

const HJetrion = lazy(() => import("../pages/digital-print/H-JETRION"));
const ICanon = lazy(() => import("../pages/digital-print/I-CANON"));
const IIndigo = lazy(() => import("../pages/digital-print/I-INDIGO"));

// ROLT
const HRolt = lazy(() => import("../pages/rolt/H-ROLT"));
const Rockway = lazy(() => import("../pages/rolt/ROCKWAY"));

// CONV
const LRewind = lazy(() => import("../pages/converting/L-REWIND"));
const OZundplot = lazy(() => import("../pages/converting/O-ZUNDPLOT"));
const PDiecut = lazy(() => import("../pages/converting/P-DIECUT"));
const PDmod01 = lazy(() => import("../pages/converting/P-DMOD01"));
const QEs400xy = lazy(() => import("../pages/converting/Q-WS400XY"));

// CIRCUIT
const SPARTANICS = lazy(() => import("../pages/circuit-department/SPARTANICS"));
const VPickplac = lazy(() => import("../pages/circuit-department/V-PICKPLAC"));
const VPickplc2 = lazy(() => import("../pages/circuit-department/V-PICKPLC2"));
const WMembrane = lazy(() => import("../pages/circuit-department/W-MEMBRANE"));
const WStage = lazy(() => import("../pages/circuit-department/W-STAGE"));

// SHIPPING
const Shipping = lazy(() => import("../pages/shipping/Z-SHIP"));

// LAM
const NLam = lazy(() => import("../pages/lam/N-LAM"));
const NLamAuto = lazy(() => import("../pages/lam/N-LAM-AUTO"));

// OBSOLETE
const CirASMBLY = lazy(() => import("../pages/obsolete/Cir_ASMBLY"));
const HSakurai2 = lazy(() => import("../pages/obsolete/H Sakurai 2"));
const HRoltFin = lazy(() => import("../pages/obsolete/H-Rolt fin"));
const HSvecia1 = lazy(() => import("../pages/obsolete/H-Svecia 1"));
const HSvecia2 = lazy(() => import("../pages/obsolete/H-Svecia 2"));
const HSvecia3 = lazy(() => import("../pages/obsolete/H-Svecia 3"));
const HSakurai = lazy(() => import("../pages/obsolete/H_Sakurai"));
const JOSOutsideService = lazy(
  () => import("../pages/obsolete/J-OS -Outside service")
);
const LZebra = lazy(() => import("../pages/obsolete/L-Zebra"));
const QLam = lazy(() => import("../pages/obsolete/Q-Lam"));

// FINISHING
const V_ASSEMBLE = lazy(() => import("../pages/finishing/V-ASSEMBLE"));
const V_FINISH = lazy(() => import("../pages/finishing/V-FINISH"));

// INSPECTION
const V_INSPECT = lazy(() => import("../pages/inspection/V-INSPECT"));

export const publicRoutes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <Dashboard />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/delivery-queue",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <Home />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/contracts",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        {/* <ErrorBoundary> */}
        <PrivateRoute>
          <AppLayout>
            <Contracts />
          </AppLayout>
        </PrivateRoute>
        {/* </ErrorBoundary> */}
      </Suspense>
    ),
  },
  {
    path: "/operations",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <Operations />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/operations/:jobID",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <Operations />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/po",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <PO />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/tracking",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <Tracking />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/training",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <Training />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/productionMeeting",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <Meeting />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/requestPage",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <RequestPage />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/pending-jobs",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <PendingJobs />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  // ENG
  {
    path: "/a-art",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <Aart />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/hytech",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <Hytech />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/qc",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <Qc />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/eco",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <Eco />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/fai",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <Fai />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/a-customer",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <ACustomer />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  // PRINT
  {
    path: "/d-screens",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <DScreens />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/e-ink",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <EInk />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/h-cylinder",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <HCylinder />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/h-ss-semi",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <HSSSemi />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/k-despatch",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <KDespatch />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  // MATERIAL
  {
    path: "/f-material",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <FMaterial />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  // DIGIT
  {
    path: "/h-jetrion",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <HJetrion />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/i-canon",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <ICanon />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/i-indigo",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <IIndigo />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  // ROLT
  {
    path: "/h-rolt",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <HRolt />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/rockway",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <Rockway />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  // CONV
  {
    path: "/l-rewind",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <LRewind />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/o-zundplot",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <OZundplot />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/p-diecut",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <PDiecut />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/p-dmod01",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <PDmod01 />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/attendance",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <EmployeeAttendance />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/q-ws400xy",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <QEs400xy />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  // CIRCUIT
  {
    path: "/spartanics",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <SPARTANICS />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/v-pickplac",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <VPickplac />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/v-pickplc2",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <VPickplc2 />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/w-membrane",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <WMembrane />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/w-stage",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <WStage />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  // LAM
  {
    path: "/n-lam",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <NLam />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/n-lam-auto",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <NLamAuto />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  // SHIPPING
  {
    path: "/z-ship",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <Shipping />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  // FINISHING
  {
    path: "/v-assemble",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <V_ASSEMBLE />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/v-finish",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <V_FINISH />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  // INSPECTION
  {
    path: "/v-inspect",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <V_INSPECT />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  // OBSOLETE
  {
    path: "/h-rolt-fin",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <HRoltFin />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/cir-asmbly",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <CirASMBLY />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/h-sakurai-2",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <HSakurai2 />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/h-sakurai",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <HSakurai />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/h-svecia-1",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <HSvecia1 />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/h-svecia-2",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <HSvecia2 />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/h-svecia-3",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <HSvecia3 />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/j-os-outside-service",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <JOSOutsideService />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/l-zebra",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <LZebra />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/q-lam",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <QLam />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  //
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/mission",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          {/* <AppLayout> */}
          <Mission />
          {/* </AppLayout> */}
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/delivery-queue-details/:partID",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <DeliveryQueueDetails />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/po-details/:jobID",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <PoReviewPage />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/material-requirement/:jobID",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <MaterialRequirements />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/shiplines/:jobID",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <Shiplines />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/jobs/latest",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <AutoCreateFolders />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
];
