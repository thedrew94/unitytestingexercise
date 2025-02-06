// scrivere i test
describe('Input validation tests', () => {
    // funzioni da implementare dopo il test
    // funzioni da importare/exportare in seguito
    const validateName = (name) => {
        if (name.length < 3) return "Il nome deve essere lungo almeno 3 caratteri";
        // null significa che la validazione e passata
        return null; 
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) return "Lemail non e valida";
        // null significa che la validazione e passata
        return null;
    };

    const validateParticipants = (participants) => {
        participants = parseInt(participants, 10);
        if (isNaN(participants) || participants <= 0 || participants > 10) {
            return "Il numero di partecipanti deve essere tra 1 e 10";
        }
        // null significa che la validazione e passata
        return null;
    };

    test('Name validation', () => {
        expect(validateName('Al')).toBe("Il nome deve essere lungo almeno 3 caratteri.");
        expect(validateName('Alex')).toBeNull();
    });

    test('Email validation', () => {
        expect(validateEmail('invalid.email')).toBe("Lemail non e valida.");
        expect(validateEmail('valid@email.com')).toBeNull();
    });

    test('Participants validation', () => {
        expect(validateParticipants('0')).toBe("Il numero di partecipanti deve essere tra 1 e 10.");
        expect(validateParticipants('11')).toBe("Il numero di partecipanti deve essere tra 1 e 10.");
        expect(validateParticipants('5')).toBeNull();
    });

    test('Multiple validation errors', () => {
        const errors = {
            name: validateName('Al'),
            email: validateEmail('invalid.email'),
            participants: validateParticipants('11')
        };
        expect(errors.name).not.toBeNull();
        expect(errors.email).not.toBeNull();
        expect(errors.participants).not.toBeNull();
    });
});

/////////////////////////////////
/////////////////////////////////
// integration test 

// import delle funzioni create precedentemente
import { validateName, validateEmail, validateParticipants } from './validation';

describe('Integration Tests', () => {
    let mockAPI;

    // il mock della funzione API
    beforeEach(() => {
        mockAPI = jest.fn(); 
    });

    test('Form submission with valid data', () => {
        const formData = { name: 'Fabio', email: 'fabio@example.com', participants: '3' };
        const errors = {
            name: validateName(formData.name),
            email: validateEmail(formData.email),
            participants: validateParticipants(formData.participants)
        };

        if (Object.values(errors).every(error => error === null)) {
            // simulazione dellinvio del form
            mockAPI(formData); 
            expect(mockAPI).toHaveBeenCalledWith(formData);
        } else {
            expect(mockAPI).not.toHaveBeenCalled();
        }
    });

    test('Form submission with invalid data shows errors', () => {
        const formData = { name: 'Xx', email: 'invalid.email', participants: '11' };
        const errors = {
            name: validateName(formData.name),
            email: validateEmail(formData.email),
            participants: validateParticipants(formData.participants)
        };

        expect(errors.name).not.toBeNull();
        expect(errors.email).not.toBeNull();
        expect(errors.participants).not.toBeNull();
        expect(mockAPI).not.toHaveBeenCalled();
    });
});
