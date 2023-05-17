import { Role } from '../enums/Role';

export const checkLocalStorage = (onOpen: () => void): [Role, any] => {
  const middlegrounds = localStorage.getItem('middlegrounds');
  const middlegroundsAttendee = localStorage.getItem('middlegroundsattendee');
  let timestamp = null;
  let data = null;
  let role = Role.None;
  const now = new Date().getTime();

  if (middlegrounds) {
    data = JSON.parse(middlegrounds);
    timestamp = data.timestamp;
    role = Role.Creator;

    // If timestamp is older than 24 hours, remove 'middlegrounds' from localStorage and open modal
    if (now - timestamp >= 24 * 60 * 60 * 1000) {
      localStorage.removeItem('middlegrounds');
      onOpen(); // Open the AddAttendeeModal
      return [Role.None, null];
    }
  } else if (middlegroundsAttendee) {
    data = JSON.parse(middlegroundsAttendee);
    timestamp = data.timestamp;
    role = Role.Attendee;

    // If timestamp is older than 24 hours, remove 'middlegroundsattendee' from localStorage and open modal
    if (now - timestamp >= 24 * 60 * 60 * 1000) {
      localStorage.removeItem('middlegroundsattendee');
      onOpen(); // Open the AddAttendeeModal
      return [Role.None, null];
    }
  } else {
    // If neither 'middlegrounds' nor 'middlegroundsattendee' are in localStorage, open the modal
    onOpen();
    return [Role.None, null];
  }

  // If we've gotten this far without returning, then the data is still valid (less than 24 hours old), so we return it
  return [role, data];
};
