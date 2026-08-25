/**
 * SwiftBook / STAAH CSBE API types.
 *
 * Derived from LIVE network capture of the SwiftBook widget
 * (angular client at swiftbook.io/inst) talking to csbe.staah.net.
 *
 * Verified endpoints (2026-08-25, property 223NTUD2eB2ox9GXf4NTU= / 55855):
 *   1. bedataguest  — availability + room list
 *   2. ratecart     — detailed rate for a selected room
 *   3. pginfo       — payment gateway info
 *   4. bettracker   — analytics tracking
 *   5. PropertyJson — static property config
 */

/* =================================================================
   CONSTANTS
   ================================================================= */

export const PROPERTY_ID_B64 =
  process.env.NEXT_PUBLIC_STAAH_PROPERTY_ID ?? "223NTUD2eB2ox9GXf4NTU=";
export const PROPERTY_ID_DEC =
  process.env.NEXT_PUBLIC_STAAH_PROPERTY_ID_DEC ?? "55855";
export const CSBE_API_KEY =
  process.env.NEXT_PUBLIC_STAAH_API_KEY ?? "cPPq1uh0xD6BpfDFpGWEx9fxnDOUA3Y25RdigC0X";

export const CSBE_BASE = "https://csbe.staah.net/";
export const TRACKER_BASE = "https://maxtracker.staah.net/";
export const PROPERTY_JSON_BASE = "https://www.swiftbook.io/PropertyJson";

/* =================================================================
   1. bedataguest — availability + rooms
   POST https://csbe.staah.net/?RequestType=bedataguest&JDRN=Y

   VERIFIED REQUEST BODY (exact from network capture):
   {
     "Product": "no",
     "PropertyId": "223NTUD2eB2ox9GXf4NTU=",
     "CheckInDate": "2026-09-01",
     "CheckOutDate": "2026-09-03",
     "Country": "IN",
     "DeviceType": "desktop",
     "JDRN": "Y",
     "Lang": "EN",
     "RoomID": "225759",         // OPTIONAL — filters to specific room
     "Rooms": [{"Adult": 2, "Children": []}]
   }

   VERIFIED RESPONSE (exact from network capture):
   {
     "Product": [{
       "PropertyId": "55855",
       "Currency": "NZD",
       "AddonRates": {},
       "AddonsIds": "",
       "Rooms": [{
         "RoomId": "225759",
         "Roommatch": "fullmatch",
         "MinInventory": 2,
         "RestrictionTitle": "",
         "Inventory": {"2026-09-01": 2, "2026-09-02": 2},
         "RatePlans": [{
           "RateId": "1271300000000001",
           "CancellationPolicy": {"ID": 1271300000000001, ...}
         }]
       }]
     }],
     "TrackingID": "62844739813-20260825102921-83212"
   }
   ================================================================= */

export interface BdgtRequest {
  Product: "yes" | "no";
  PropertyId: string;
  CheckInDate: string;
  CheckOutDate: string;
  JDRN: "Y";
  Country?: string;
  DeviceType?: "desktop" | "mobile";
  Lang?: string;
  /** Optional: filter to a specific room ID */
  RoomID?: string;
  Rooms: { Adult: number; Children: number[] }[];
}

export interface BdgtCancellationPolicy {
  ID?: number;
  Description?: string;
  Type?: string;
}

export interface BdgtRatePlan {
  RateId?: string;
  CancellationPolicy?: BdgtCancellationPolicy;
  /** Rates are nested inside RatePlans — contains per-day pricing */
  Rates?: BdgtRateEntry[];
  Savings?: BdgtSavings;
}

export interface BdgtRateDayDetail {
  RateBeforeTax?: string;
  RateAfterTax?: string;
  Tax?: unknown[] | string;
  Fees?: unknown[] | string;
  Savings?: string;
  SpDesc?: string;
}

export interface BdgtRateEntry {
  Dates?: Record<string, BdgtRateDayDetail>;
  Request?: { Adult?: number; Children?: unknown[] };
}

export interface BdgtSavings {
  Title?: string;
  Icon?: string;
  SpDesc?: string;
}

export interface BdgtRoom {
  RoomId: string;
  Roommatch?: string;
  MinInventory?: number;
  RestrictionTitle?: string;
  Inventory?: Record<string, number>;
  RatePlans?: BdgtRatePlan[];
  Rates?: BdgtRateEntry[];
  Savings?: BdgtSavings;
  AllowRequestBooking?: boolean;
}

export interface BdgtProduct {
  PropertyId?: string;
  Currency?: string;
  Rooms?: BdgtRoom[];
  AddonsIds?: string;
  AddonRates?: Record<string, unknown>;
}

export interface BdgtResponse {
  Product?: BdgtProduct[];
  TrackingID?: string;
}

/* =================================================================
   2. ratecart — detailed rate for a selected room
   POST https://csbe.staah.net/?RequestType=ratecart&JDRN=Y

   VERIFIED RESPONSE (exact from network capture):
   {
     "Product": {
       "55855": {
         "4ff2544c-3242-46af-aac8-057ffba933b6": {
           "Currency": "NZD",
           "CancellationPolicy": {
             "ID": 1271300000000001,
             "Description": "• You will be charged the total price...",
             "Type": "PR"
           },
           "AddonRates": {},
           "AddonsIds": "",
           "DepositAmount": "298.00",
           "Rates": {
             "2026-09-01": {
               "RateBeforeTax": "149.00",
               "RateAfterTax": "149.00",
               "Tax": [],
               "Fees": [],
               "Savings": "0.00"
             },
             "2026-09-02": { ... }
           },
           "Savings": {"SavingsTitle": "", "SpDesc": "", "Icon": ""}
         }
       }
     },
     "TrackingID": "49717288232-20260825103417-91664"
   }

   NOTE: The UUID key (e.g. "4ff2544c-...") is server-generated per cart session.
   ================================================================= */

export interface RateCartDay {
  RateBeforeTax: string;
  RateAfterTax: string;
  Tax: unknown[];
  Fees: unknown[];
  Savings: string;
}

export interface RateCartSavings {
  SavingsTitle?: string;
  SpDesc?: string;
  Icon?: string;
}

export interface RateCartCancellationPolicy {
  ID?: number;
  Description?: string;
  Type?: string;
}

/** A single room's rate cart entry, keyed by a server-generated UUID */
export interface RateCartEntry {
  Currency: string;
  CancellationPolicy: RateCartCancellationPolicy;
  AddonRates: Record<string, unknown>;
  AddonsIds: string;
  DepositAmount: string;
  Rates: Record<string, RateCartDay>;
  Savings: RateCartSavings;
}

/** The inner property block (keyed by property decimal ID) */
export type RateCartPropertyBlock = Record<string, RateCartEntry>;

/** Top-level ratecart response — Product is an object, not array */
export interface RateCartResponse {
  Product?: Record<string, RateCartPropertyBlock>;
  TrackingID?: string;
}

/* =================================================================
   3. pginfo — payment gateway info
   GET https://csbe.staah.net/?RequestType=pginfo&JDRN=Y
       &PropertyId=223NTUD2eB2ox9GXf4NTU=&Currency=NZD&Lang=EN

   VERIFIED RESPONSE (exact from network capture):
   {
     "data": [{
       "PgId": 0,
       "PgName": "creditcard",
       "DisplayName": "Credit Card",
       "PaymentUrl": "",
       "PaymentInfo": "",
       "Notes": "",
       "CheckboxRequired": false,
       "Iscollect": true,
       "Priority": 999,
       "RequiredAddress": false,
       "logo": null
     }],
     "TrackingID": "14851086922-20260825103416-99721"
   }
   ================================================================= */

export interface PgInfoGateway {
  PgId: number;
  PgName: string;
  DisplayName: string;
  PaymentUrl: string;
  PaymentInfo: string;
  Notes: string;
  CheckboxRequired: boolean;
  Iscollect: boolean;
  Priority: number;
  RequiredAddress: boolean;
  logo: string | null;
}

export interface PgInfoResponse {
  data?: PgInfoGateway[];
  TrackingID?: string;
}

/* =================================================================
   4. bettracker — analytics tracking
   POST https://maxtracker.staah.net/betracker?propertyId=NTU4NTU=

   VERIFIED REQUEST BODY (exact from network capture):
   {
     "propertyid": "55855",
     "visite_id": "KGCiq1787651842",
     "action": "Form View Loaded",
     "action_type": "100",
     "bestrate": "",
     "booking_id": "",
     "browser": "CHROME",
     "checkin": "2026-09-01",
     "checkout": "2026-09-03",
     "country": "India",
     "create_date": "2026-08-25T10:31:03.577Z",
     "createdate": "2026-08-25",
     "device": "DESKTOP",
     "os": "WINDOWS",
     "proc_detail": "Checkin:01-09-2026|Checkout:03-09-2026",
     "propertyid": "55855",
     "referal_url": "https://brookside-motelnz.netlify.app/",
     "refreshcount": "0",
     "source_site": "I",
     "sub_action_type": "11",
     "user_agent": "...",
     "visite_id": "KGCiq1787651842"
   }

   There is ALSO a secondary tracking hit to the same endpoint with
   slightly different field names (camelCase):
   {
     "uniqueid": "KGCiq1787651842",
     "action": "Form View Loaded",
     "visite_id": "KGCiq1787651842",
     "pid": "55855",
     "action_detail": "ROOM_SELECTED",
     "action_details": "ROOM_SELECTED",
     "action_type": "100",
     "bestRate": "",
     "browser": "chrome",
     "checkIn": "01-09-2026",
     "checkOut": "03-09-2026",
     "checkin": "01-09-2026",
     "checkout": "03-09-2026",
     "device": "Desktop",
     "os": "Windows",
     "pid": "55855",
     "proc_detail": "Checkin:01-09-2026|Checkout:03-09-2026",
     "processed_detail": "Checkin:01-09-2026|Checkout:03-09-2026",
     "propertyid": "55855",
     "ref": "https://www.swiftbook.io/inst/#home?...",
     "referal_url": "https://brookside-motelnz.netlify.app/",
     "source": "api",
     "source_site": "I",
     "sub_action_type": "11"
   }

   These are analytics-only. Not required for booking flow.
   ================================================================= */

export interface TrackerPayload {
  propertyid: string;
  visite_id: string;
  action: string;
  action_type: string;
  action_detail?: string;
  bestrate?: string;
  booking_id?: string;
  browser?: string;
  checkin?: string;
  checkout?: string;
  country?: string;
  create_date?: string;
  createdate?: string;
  device?: string;
  os?: string;
  proc_detail?: string;
  referal_url?: string;
  refreshcount?: string;
  source_site?: string;
  sub_action_type?: string;
  user_agent?: string;
  [key: string]: unknown;
}

/* =================================================================
   Normalised room quote — what the UI consumes
   ================================================================= */

export interface RoomQuote {
  /** STAAH numeric room ID (e.g. "225759") */
  roomId: string;
  /** Whether rooms are available for the given dates/guests */
  available: boolean;
  /** Restriction message from STAAH */
  restrictionTitle: string;
  /** Remaining inventory count */
  minInventory: number;
  /** ISO 4217 currency code (e.g. "NZD") */
  currency: string;
  /** Total price for entire stay (all nights, after tax) */
  total: number;
  /** Lowest single-night rate (after tax), or null */
  minNightly: number | null;
  /** Per-night rates array (after tax) */
  nightlyRates: { date: string; beforeTax: number; afterTax: number }[];
  /** Number of nights in the stay */
  nights: number;
  /** Free-text cancellation policy description (from bedataguest) */
  cancellationDesc: string;
  /** RatePlan ID — needed for ratecart call */
  rateId: string;
}

/** Detailed rate from ratecart — displayed after room selection */
export interface RateDetail {
  currency: string;
  depositAmount: number;
  totalAmount: number;
  cancellationDesc: string;
  cancellationType: string;
  perDay: Record<string, { beforeTax: number; afterTax: number; savings: number }>;
}

/* =================================================================
   Manage booking
   POST https://ckswidget.staah.net/manageMyBooking
   TODO: REQUIRE OFFICIAL SWIFTBOOK API INFORMATION
   ================================================================= */

export interface ManageBookingRequest {
  PropertyId: string;
  ConfirmationNumber: string;
  Email: string;
  DeviceType?: string;
  Lang?: string;
}

/** TODO: REQUIRE OFFICIAL SWIFTBOOK API INFORMATION */
export interface ManageBookingResponse {
  Booking?: {
    ConfirmationNumber?: string;
    Status?: string;
    CheckInDate?: string;
    CheckOutDate?: string;
    RoomName?: string;
    GuestName?: string;
    TotalAmount?: string;
    Currency?: string;
    CancellationPolicy?: string;
  };
  Success?: boolean;
  Message?: string;
}

/* =================================================================
   5. bookingverify — create/verify booking
   POST https://csbe.staah.net/?RequestType=bookingverify&JDRN=Y

   VERIFIED: Discovered from SwiftBook widget source (ApiProvider).

   Request body (from widget source):
   {
     PropertyId: "223NTUD2eB2ox9GXf4NTU=",
     RoomID: "225759",
     RateId: "1271300000000001",
     CheckInDate: "2026-09-01",
     CheckOutDate: "2026-09-03",
     Adults: 2,
     Children: [],
     FirstName: "John",
     LastName: "Doe",
     Email: "john@example.com",
     Phone: "+6421234567",
     ArrivalTime: "3:00 PM",
     SpecialRequests: "",
     JDRN: "Y"
   }
   ================================================================= */

export interface BookingVerifyRequest {
  PropertyId: string;
  RoomID: string;
  RateId?: string;
  CheckInDate: string;
  CheckOutDate: string;
  Adults: number;
  Children: number[];
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  ArrivalTime?: string;
  SpecialRequests?: string;
  JDRN: "Y";
  [key: string]: unknown;
}

export interface BookingVerifyResponse {
  Success?: boolean;
  BookingId?: string;
  ConfirmationNumber?: string;
  Message?: string;
  /** Payment URL — if present, redirect to complete payment */
  PaymentUrl?: string;
  /** Direct confirmation details if payment not required */
  Booking?: {
    ConfirmationNumber?: string;
    Status?: string;
    CheckInDate?: string;
    CheckOutDate?: string;
    RoomName?: string;
    TotalAmount?: string;
    Currency?: string;
  };
  TrackingID?: string;
}

/* =================================================================
   6. getpaymentlinkdetail — payment processing
   POST https://csbe.staah.net/securelink/?RequestType=getpaymentlinkdetail&JDRN=Y

   VERIFIED: Discovered from SwiftBook widget source (ApiProvider).
   The CC data is encrypted client-side before sending.

   Request body (from SecurePayment component):
   {
     action: "create_json",
     property_id: "223NTUD2eB2ox9GXf4NTU=",
     pg_id: "0",
     cust_address: "",
     cust_city: "",
     cust_country: "",
     cust_phone: "",
     cust_postalcode: "",
     cust_state: "",
     dial_code: "",
     guest_extras_info: "<encrypted CC data>",
     token_id: "<random token>",
     partner_id: 1,
     channel_booking_id: "<booking ID from bookingverify>",
     request_type: "pay",
     ttl_date: ""
   }

   Response: { url: "..." } — redirect to payment page or confirmation
   ================================================================= */

export interface PaymentLinkRequest {
  action: "create_json";
  property_id: string;
  pg_id: string;
  cust_address?: string;
  cust_city?: string;
  cust_country?: string;
  cust_phone?: string;
  cust_postalcode?: string;
  cust_state?: string;
  dial_code?: string;
  guest_extras_info: string;
  token_id: string;
  partner_id: number;
  channel_booking_id: string;
  request_type?: string;
  ttl_date?: string;
}

export interface PaymentLinkResponse {
  url?: string;
  confirmationURL?: string;
  Message?: string;
  TrackingID?: string;
}

/* =================================================================
   Manage booking — via managereservation endpoint
   POST https://csbe.staah.net/managereservation/?RequestType=...
   ================================================================= */

export interface ManageBookingRequest {
  PropertyId: string;
  ConfirmationNumber: string;
  Email: string;
  DeviceType?: string;
  Lang?: string;
}

/** TODO: REQUIRE OFFICIAL SWIFTBOOK API INFORMATION */
export interface ManageBookingResponse {
  Booking?: {
    ConfirmationNumber?: string;
    Status?: string;
    CheckInDate?: string;
    CheckOutDate?: string;
    RoomName?: string;
    GuestName?: string;
    TotalAmount?: string;
    Currency?: string;
    CancellationPolicy?: string;
  };
  Success?: boolean;
  Message?: string;
}

/* =================================================================
   Credit card encryption — AES-256-CBC
   VERIFIED: Keys hardcoded in SwiftBook widget (encryptCCData function).
   IV: "Wuwr6ka?2uW7eCEc$29K&1Ia*px0LD?c"
   Key: "V-a+Jg?pTw4XuJ^&"
   ================================================================= */

export const CC_ENCRYPT_IV = "Wuwr6ka?2uW7eCEc$29K&1Ia*px0LD?c";
export const CC_ENCRYPT_KEY = "V-a+Jg?pTw4XuJ^&";

/* =================================================================
   7. berate — calendar inventory (GET)
   GET https://csbe.staah.net/?RequestType=berate&PropertyId=...
       &Product=no&FromDate=2026-08-26&ToDate=2026-08-27
       &JDRN=Y&RoomID=225755,225756,225757,225758,225759&ignoreRates=true

   VERIFIED REQUEST (exact from network capture):
     Query params: RequestType, PropertyId, Product, FromDate, ToDate,
                   JDRN, RoomID (comma-separated), ignoreRates

   VERIFIED RESPONSE:
   {
     "PropertyList": [{
       "PropertyId": "55855",
       "Currency": "NZD",
       "DayRate": { "2026-08-26": { "Inventory": 1 } }
     }],
     "TrackingID": "12652026382-20260825105635-29995"
   }
   ================================================================= */

export interface BerateDayRate {
  Inventory?: number;
  Rate?: number;
}

export interface BerateProperty {
  PropertyId?: string;
  Currency?: string;
  DayRate?: Record<string, BerateDayRate>;
}

export interface BerateResponse {
  PropertyList?: BerateProperty[];
  TrackingID?: string;
}

/* =================================================================
   8. bewidget — widget/property config (GET)
   GET https://csbe.staah.net/bewidget/?Action=fetch
       &PropertyId=223NTUD2eB2ox9GXf4NTU=
       &ScriptId=223NTUD2eB2ox9GXf4NTU=

   VERIFIED RESPONSE:
   {
     "Data": {
       "PropertyData": {
         "WidgetPermission": { HideAdultChild: false, MultiCurrency: false },
         "BeUrl": "...",
         "CalenderOfDays": 1,
         "ChildAge": 15,
         "Currency": "NZD",
         "PropertyDate": "2026-08-25",
         "PropertyId": "55855",
         "RoomData": {
           "Rooms": [
             { RoomId: "225755", RoomName: "SUPERIOR ROOM - OUTDOOR AREA", CurrName: "NZD" },
             ...
           ],
           "Rates": []
         },
         "OtherInfo": { MaxGuest: 4, MaxAdult: 4, MaxChildren: 3 },
         "SoldoutPrompt": { Hide: false, Description: "..." },
         "ThemeData": { PrimaryColor: "#009900", ... },
         "ScriptData": {
           RoomIds: "225755,225756,225757,225758,225759",
           MinNight: 1,
           ...
         },
         "whiteLblDomainsForWidget": ["www.brooksidemotel.co.nz", ...]
       },
       "ContentData": {
         DateFormat: "dd-MM-yyyy",
         CheckinLabel: "check in",
         ...
       }
     },
     "TrackingID": "..."
   }
   ================================================================= */

export interface BeWidgetRoom {
  RoomId: string;
  RoomName: string;
  CurrName: string;
}

export interface BeWidgetRoomData {
  Rooms?: BeWidgetRoom[];
  Rates?: unknown[];
}

export interface BeWidgetOtherInfo {
  MaxGuest?: number;
  MaxAdult?: number;
  MaxChildren?: number;
}

export interface BeWidgetScriptData {
  RoomIds?: string;
  MinNight?: number;
  MaxNight?: number;
  Direction?: string;
  FontName?: string;
  PackageIds?: string;
  ProductType?: string;
  BeType?: string;
  Title?: string;
  AdvancePurchase?: number;
  [key: string]: unknown;
}

export interface BeWidgetSoldoutPrompt {
  Hide?: boolean;
  Description?: string;
}

export interface BeWidgetPermissions {
  HideAdultChild?: boolean;
  MultiCurrency?: boolean;
}

export interface BeWidgetPropertyData {
  WidgetPermission?: BeWidgetPermissions;
  BeUrl?: string;
  CalenderOfDays?: number;
  ChildAge?: number;
  Currency?: string;
  InfantAge?: string;
  PropertyDate?: string;
  PropertyId?: string;
  RoomData?: BeWidgetRoomData;
  OtherInfo?: BeWidgetOtherInfo;
  SoldoutPrompt?: BeWidgetSoldoutPrompt;
  ThemeData?: Record<string, string>;
  ScriptData?: BeWidgetScriptData;
  whiteLblDomainsForWidget?: string[];
}

export interface BeWidgetContentData {
  DateFormat?: string;
  CheckinLabel?: string;
  CheckoutLabel?: string;
  ButtonLabel?: string;
  CurrencyDropdownLabel?: string;
  EnableCurrencyDropdown?: boolean;
  EnableNationalityDropdown?: boolean;
  PromoCodeLabel?: string;
  RoomAndGuestLabel?: string;
}

export interface BeWidgetResponse {
  Data?: {
    PropertyData?: BeWidgetPropertyData;
    ContentData?: BeWidgetContentData;
  };
  TrackingID?: string;
}

/* =================================================================
   Property JSON — static config
   GET https://www.swiftbook.io/PropertyJson/EN/{propertyId}.json
   ================================================================= */

export interface PropertyJsonRoom {
  RoomId?: string;
  Name?: string;
  Description?: string;
  MaxAdults?: number;
  MaxChildren?: number;
  BedType?: string;
  RoomSize?: string;
  ImageUrl?: string;
}

export interface PropertyJsonRatePlan {
  RateId?: string;
  Name?: string;
  CancellationPolicy?: BdgtCancellationPolicy;
  MealPlan?: string;
}

export interface PropertyJson {
  PropertyId?: string;
  PropertyName?: string;
  Currency?: string;
  Rooms?: PropertyJsonRoom[];
  RatePlans?: PropertyJsonRatePlan[];
  CheckInTime?: string;
  CheckOutTime?: string;
  Policies?: string[];
  Address?: string;
  Phone?: string;
  Email?: string;
}

/* =================================================================
   Search parameters — what the UI passes around
   ================================================================= */

export interface BookingSearchParams {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
}

export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  arrivalTime: string;
  requests: string;
}
