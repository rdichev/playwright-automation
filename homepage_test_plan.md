# Homepage Test Plan

## Application Overview

Test plan for the SalesPulse AI homepage, covering page load, navigation, model selection, help features, sign-in flow, and file upload functionality.

## Test Scenarios

### 1. Homepage Functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify homepage loads correctly

**File:** `tests/homepage/page_load.spec.ts`

**Steps:**
  1. Navigate to the homepage URL
    - expect: Page title is 'SalesPulse AI'
    - expect: URL is 'https://salespulse-ai-b7acd.web.app/'
    - expect: Header elements are visible: logo, model selector, Help & Features button, Sign In button
    - expect: Main content is displayed: heading, description, upload area, sign-in prompt
  2. Check the default selected option in the model combobox
    - expect: Model selector shows 'Gemini 3.0 Flash (Fastest)' as default

#### 1.2. Test model selection functionality

**File:** `tests/homepage/model_selection.spec.ts`

**Steps:**
  1. Select 'Gemini 3.0 Pro (Best Quality)' from the combobox
    - expect: Model selector changes to 'Gemini 3.0 Pro (Best Quality)'
  2. Select 'Gemini 3.0 Flash (Fastest)' from the combobox
    - expect: Model selector changes back to 'Gemini 3.0 Flash (Fastest)'

#### 1.3. Test Help & Features modal

**File:** `tests/homepage/help_features.spec.ts`

**Steps:**
  1. Click on the 'Help & Features' button
    - expect: Help & Features modal opens with 'Platform Features' heading and detailed feature descriptions
  2. Click on the 'Got it' button in the modal
    - expect: Modal closes and page returns to original state

#### 1.4. Test Sign In button

**File:** `tests/homepage/sign_in.spec.ts`

**Steps:**
  1. Click on the 'Sign In' button
    - expect: Google sign-in popup opens in a new window/tab

#### 1.5. Test upload area interaction

**File:** `tests/homepage/upload_area.spec.ts`

**Steps:**
  1. Click on the 'Upload Sales Call' area
    - expect: File chooser dialog opens
  2. Drag and drop a valid audio file onto the upload area
    - expect: Upload area accepts drag and drop (if file dragged)

#### 1.6. Upload valid audio file

**File:** `tests/homepage/upload_valid_file.spec.ts`

**Steps:**
  1. Select a valid audio file (MP3, WAV, or M4A) under 500MB
    - expect: File is accepted and processing starts
  2. Wait for processing to complete
    - expect: Analysis results are displayed: scorecard, sentiment chart, transcript, etc.

#### 1.7. Upload invalid file type

**File:** `tests/homepage/upload_invalid_file.spec.ts`

**Steps:**
  1. Select a non-audio file (e.g., .txt, .jpg)
    - expect: Error message displayed: 'Unsupported file format'

#### 1.8. Upload file exceeding size limit

**File:** `tests/homepage/upload_large_file.spec.ts`

**Steps:**
  1. Select an audio file larger than 500MB
    - expect: Error message displayed: 'File size exceeds 500MB limit'

#### 1.9. Attempt upload without selecting file

**File:** `tests/homepage/upload_no_file.spec.ts`

**Steps:**
  1. Click upload without selecting a file
    - expect: No action or error message if applicable

#### 1.10. Upload and save assessment when signed in

**File:** `tests/homepage/signed_in_upload.spec.ts`

**Steps:**
  1. Sign in with Google account
    - expect: User is signed in
  2. Upload a file and verify save functionality
    - expect: Assessment is saved and accessible later

#### 1.11. Test responsive design

**File:** `tests/homepage/responsive_design.spec.ts`

**Steps:**
  1. Resize browser window to mobile dimensions
    - expect: Layout adjusts appropriately for mobile view
  2. Interact with elements in mobile view
    - expect: All elements remain accessible and functional
