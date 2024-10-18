# Datepicker Component with National Holidays Integration

A customizable datepicker component for [your framework, e.g., React], integrated with national holidays.This component allows users to easily pick dates while displaying holiday information, enhancing scheduling and planning functionalities.

## Features
    - Date Selection: Allows users to select dates from a calendar interface.
- National Holidays Highlighting: Automatically highlights and marks national holidays.
- Customizable: Options for styling, holiday data source, and other configurations.
- Responsive Design: Works well on various screen sizes.
- Localization Support: Option to configure holiday data for different regions.


## Installation
Instalasi package ini dapat dilakukan dengan perintah berikut:

```bash
npm install https://github.com/Muhaca/mc-date-picker.git
```

## Usage
Here's a basic example of how to use the datepicker component:

    ```javascript
import React, { useState } from 'react';
import { DatePickerIndonesianHoliday } from '@muhaca/datepicker';

const App = () => {

  return (
    <div>
      <h1>Dynamic Form</h1>
      <DatePickerIndonesianHoliday />
    </div>
  );
};

export default App;
```

## Contributing
Pull requests are welcome.For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)