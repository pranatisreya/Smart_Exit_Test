const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');


const cors = require('cors');



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



// Environment Variables
const MONGODB_URI = 'mongodb atlas connection URL';
const EMAIL_USER = 'your email';
const EMAIL_PASS = 'your email app password';


mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('GatePass_DB MongoDB CONNECTED');
  })
  .catch((err) => console.log(err));



const StudentSchema = new mongoose.Schema({
  studentName: String,
  rollNo: String,
  branch: String,
  year:String,
  section: String,
  semester: String,
  phoneNumber: String,
  personalEmail: String,
  officialEmail: String,
  parentName: String,
  parentPhoneNumber: String,
  parentEmail: String,
  password: String,
  confirmPassword: String,
  registrationDate: { type: Date, default: Date.now },
});

const Student = mongoose.model('Student', StudentSchema, 'StudentRegisters_db');


const LeaveApplicationSchema = new mongoose.Schema({
  rollNo: String,
  reason: String,
  date: String,
  timeSlot: String,
  status: String,
  outTime: { type: String, default: 'N/A' }
});

const LeaveApplication = mongoose.model('LeaveApplication', LeaveApplicationSchema, 'StudentGatePass_db');



// const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const mongoose = require('mongoose');

// // Create storage engine for GridFS
// const storage = new GridFsStorage({
//   url: 'mongodb://127.0.0.1:27017/GatePass_DB',
//   file: (req, file) => {
//     return {
//       bucketName: 'photos', // where photos will be stored in MongoDB
//       filename: file.originalname, // original file name
//     };
//   }
// });

// const upload = multer({ storage });

// // Route for student registration with image upload
// app.post('/StudentRegister', upload.single('passportPhoto'), async (req, res) => {
//   const { studentName, rollNo, branch, year, section, semester, phoneNumber, personalEmail, officialEmail, parentName, parentPhoneNumber, parentEmail, password, confirmPassword } = req.body;
//   const passportPhoto = req.file ? req.file.filename : null; // Retrieve the uploaded file's name

//   try {
//     const existingStudent = await Student.findOne({ rollNo });
//     if (existingStudent) {
//       res.json('exist');
//     } else {
//       const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
//       otpCache[personalEmail] = otp;

//       const newStudent = new Student({
//         studentName,
//         rollNo,
//         branch,
//         year,
//         section,
//         semester,
//         phoneNumber,
//         personalEmail,
//         officialEmail,
//         parentName,
//         parentPhoneNumber,
//         parentEmail,
//         password,
//         confirmPassword,
//         passportPhoto, // Add the passport photo filename to the student data
//         registrationDate: new Date(),
//       });

//       await newStudent.save();
//       res.json('notexist');
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json('error');
//   }
// });




app.get('/StudentRegister', cors(), (req, res) => {
  Student.find()
    .then((students) => res.json(students))
    .catch((err) => res.status(400).json({ error: err.message }));
});

const otpCache = {};

app.post('/StudentRegister', async (req, res) => {
  const {
    studentName,
    rollNo,
    branch,
    year,
    section,
    semester,
    phoneNumber,
    personalEmail,
    officialEmail,
    parentName,
    parentPhoneNumber,
    parentEmail,
    password,
    confirmPassword,
  } = req.body;

  try {
    const existingStudent = await Student.findOne({ rollNo });

    if (existingStudent) {
      // Student already exists, send a response
      res.json('exist');
    } else {
      // Student doesn't exist, proceed to save

      // Example of generating a 6-digit numeric OTP
      const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });

      // Use the generated OTP as needed
      console.log(otp);
      otpCache[personalEmail] = otp;

      // Send OTP to the student's personal email
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // e.g., 'smtp.example.com'
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: 'pranatisreya.dama@gmail.com',
        to: personalEmail,
        subject: 'CBIT smart-exit registration OTP',
        text: `Your OTP for registration is: ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).json('error');
        }
        console.log('Email sent: ' + info.response);
      });

      res.json('notexist');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('error');
  }
});


app.post('/StudentVerify', async (req, res) => {
  const { personalEmail, enteredOTP ,formData} = req.body;

  // Retrieve the stored OTP from the database or in-memory cache
  const storedOTP = otpCache[personalEmail];

  console.log('Entered OTP:', enteredOTP);
  console.log('Stored OTP:', storedOTP);

  if (enteredOTP === storedOTP) {
    const newStudent = new Student({
      ... formData,
      registrationDate: new Date(),

    });

    await newStudent.save();
    // Redirect to login or send a success response
    res.json('verified');
  } 
  else {
    // Incorrect OTP
    res.json('notverified');
  }
});


// app.put('/StudentRegister:rollNo', (req, res) => {
//   Student.findByIdAndUpdate(req.params.id, { status: req.body.status })
//     .then(() => res.json({ message: 'Registration updated!' }))
//     .catch((err) => res.status(400).json({ error: err.message }));
// });

// app.delete('/StudentRegister/:rollNo', (req, res) => {
//   Student.findByIdAndDelete(req.params.id)
//     .then(() => res.json({ message: 'Registration deleted!' }))
//     .catch((err) => res.status(400).json({ error: err.message }));
// });

app.post('/StudentLogin', async (req, res) => {
  const { rollNo, password } = req.body;

  try {
    const student = await Student.findOne({ rollNo, password });

    if (student) {
      // Respond with the rollNo on successful login
      res.json({ rollNo: student.rollNo });
    } else {
      res.json({ status: 'notexist' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/StudentPage/:rollNo', cors(), async (req, res) => {
  const rollNo = req.params.rollNo;
  console.log('Received request for rollNo:', rollNo);

  try {
    const student = await Student.findOne({ rollNo }, { password: 0 ,_id: 0});

    if (student) {
      console.log('Student data found:', student);
      res.json(student);
    } else {
      console.log('Student not found');
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error fetching student data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/StudentLeave', async (req, res) => {
  const { rollNo, reason, date, timeSlot,status,outTime } = req.body;

  try {
    const newLeaveApplication = new LeaveApplication({
      rollNo: String(rollNo),
      reason: String(reason),
      date: String(date),
      timeSlot: String(timeSlot),
      status: String(status) || 'Pending', // Use the provided status or default to 'Pending'
      outTime:String(outTime) || 'N/A'
    });
    const savedLeaveApplication = await newLeaveApplication.save();
    await newLeaveApplication.save();
    res.json({ message: 'Leave application submitted successfully' });
  } catch (error) {
    console.error('Error submitting leave application:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/StudentLeave/:rollNo', cors(), async (req, res) => {
  const rollNo = req.params.rollNo;
  console.log('Received request for leave applications of rollNo:', rollNo);

  try {
    const leaveApplications = await LeaveApplication.find({ rollNo });

    if (leaveApplications.length > 0) {
      console.log('Leave applications found:', leaveApplications);
      res.json(leaveApplications);
    } else {
      console.log('No leave applications found');
      res.json([]);
    }
  } catch (error) {
    console.error('Error fetching leave applications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/StudentLeave/:rollNo', (req, res) => {
  LeaveApplication.findByIdAndUpdate(req.params.id, { status: req.body.status })
    .then(() => res.json({ message: 'Leave updated!' }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.delete('/StudentLeave/:rollNo', (req, res) => {
  LeaveApplication.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Leave deleted!' }))
    .catch((err) => res.status(400).json({ error: err.message }));
});




  // Faculty Schema and Model
const FacultySchema = new mongoose.Schema({
  Employee_ID: String,
  password: String,
  Name: String,
  Department: String,
  Year: Number,
  class: String,
  Section: String,
  PersonalMail: String,
  OfficialMail: String,
  phoneNumber: String,
});

const Faculty = mongoose.model('Faculty', FacultySchema, 'FacultyDetails_db');

app.post('/FacultyLogin', async (req, res) => {
  const { Employee_ID, password } = req.body;

  try {
    const faculty = await Faculty.findOne({ Employee_ID});

    if (faculty && faculty.password === password) {
      // Respond with the Employee_ID on successful login
      res.json({ Employee_ID: faculty.Employee_ID });
    } else {
      res.json({ status: 'notexist' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/FacultyPage/:Employee_ID', cors(), async (req, res) => {
  const Employee_ID = req.params.Employee_ID;
  console.log('Received request for Employee_ID:', Employee_ID);

  try {
    const faculty = await Faculty.findOne({ Employee_ID }, { password: 0 ,_id: 0});

    if (faculty) {
      console.log('Faculty data found:', faculty);
      res.json(faculty);
    } else {
      console.log('Faculty not found');
      res.status(404).json({ message: 'Faculty not found' });
    }
  } catch (error) {
    console.error('Error fetching faculty data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/StudentDetails/:rollNo', cors(), async (req, res) => {
  const rollNo = req.params.rollNo;
  console.log('Received request for rollNo:', rollNo);

  try {
    const student = await Student.findOne({ rollNo }, { password: 0 ,_id: 0});

    if (student) {
      console.log('Student data found:', student);
      res.json(student);
    } else {
      console.log('Student not found');
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error fetching student data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/FacultyLeave/:Employee_ID', cors(), async (req, res) => {
  const Employee_ID = req.params.Employee_ID;
  console.log('Received request for leave applications of Employee_ID:', Employee_ID);
  try {
    // Retrieve faculty data
    const faculty = await Faculty.findOne({ Employee_ID });
    if (!faculty) {
      console.log('Faculty not found');
      return res.status(404).json({ message: 'Faculty not found' });
    }
    console.log(faculty)
    console.log(faculty.Year)
    console.log(faculty.Section)
    // Retrieve student data matching the faculty's year and section
    const studentsInSection = await Student.find({
      year: faculty.Year,
      section: faculty.Section,
    });
    console.log(studentsInSection)

    // Extract rollNos of students in the same section and year
    const matchingRollNos = studentsInSection.map((student) => student.rollNo);
    console.log(matchingRollNos)
    // Retrieve student data for students in the matchingRollNos array
    const studentData = await Student.find({ rollNo: { $in: matchingRollNos } });

    // Retrieve leave applications for students in the matchingRollNos array
    const leaveApplications = await LeaveApplication.find({ rollNo: { $in: matchingRollNos } });

    if (leaveApplications.length > 0) {
      console.log('Leave applications found:', leaveApplications);
      res.json({ studentData, leaveApplications });
    } else {
      console.log('No leave applications found');
      res.json({ studentData, leaveApplications: [] });
    }
  } catch (error) {
    console.error('Error fetching leave applications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/FacultyLeave/:rollNo', async (req, res) => {
  const Employee_ID = req.params.Employee_ID;
  const { status, studentDetails } = req.body;

  try {
    // Update the status of the leave application in the database
    const updatedApplication = await LeaveApplication.findOneAndUpdate(
      { rollNo: studentDetails.rollNo,
        date: studentDetails.date, 
        reason: studentDetails.reason,
        timeslot:studentDetails.timeslot,
        //outTime:studentDetails.outTime || 'N/A'
     },
      { $set: { status: status } },
      { new: true } // Return the updated document
    );

    // Check if the application was found and updated
    if (updatedApplication) {
      console.log('Leave application status updated:', updatedApplication);

      // Now, you can use the studentDetails to perform any additional actions
      console.log('Student details:', studentDetails);

      res.json(updatedApplication);
    } else {
      // If the application was not found
      console.log('Leave application not found');
      res.status(404).json({ message: 'Leave application not found' });
    }
  } catch (error) {
    console.error('Error updating leave status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




const SecuritySchema = new mongoose.Schema({
  UserName: String,
  Password: String,
  Email: String,
  PhoneNumber: String,
});

const Security = mongoose.model('Security', SecuritySchema, 'CbitSecurity_db');

app.post('/SecurityLogin', async (req, res) => {
  const { UserName, Password } = req.body;

  try {
    const security = await Security.findOne({ UserName });

    if (security && security.Password === Password) {
      // Respond with the UserName and hashed Password on successful login
      res.json({ UserName: security.UserName, Password: security.Password });
    } else {
      res.json({ status: 'notexist' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/SecurityPage/:UserName', cors(), async (req, res) => {
  const UserName = req.params.UserName;
  console.log('Received request for UserName:', UserName);

  try {
    const security = await Security.findOne({ UserName }, { Password: 0, _id: 0 });

    if (security) {
      console.log('Security data found:', security);
      res.json(security);
    } else {
      console.log('Security not found');
      res.status(404).json({ message: 'Security not found' });
    }
  } catch (error) {
    console.error('Error fetching security data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/SecurityLeave/:UserName', cors(), async (req, res) => {

  try {
    const leaveApplications = await LeaveApplication.find({ status: 'Approved' });
    res.json({ leaveApplications });
  } catch (error) {
    console.error('Error fetching leave applications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.put('/SecurityLeave/:rollNo', async (req, res) => {
  const rollNo = req.params.rollNo;
  const { status, LeaveDetails } = req.body;
  console.log(LeaveDetails)
  try {
    console.log(LeaveDetails.reason)
    const comparisonQuery = {
      rollNo,
      // reason: LeaveDetails.reason,
      //reason: LeaveDetails.reason,

      date: LeaveDetails.date,
      timeSlot: LeaveDetails.timeSlot,
      status: 'Approved',
    };
    // Update the outTime of the leave application in the database
    const updatedApplication = await LeaveApplication.findOneAndUpdate(
      comparisonQuery,
      {
        $set: {
          outTime: status === 'Yes' 
          // ? new Date().toLocaleTimeString([], { hour12: false }) + ' ' + new Date().toString()
          ?new Date().toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata', // Set the timezone to India
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
          : 'Did not leave',
        },
      },
      { new: true } // Return the updated document
    );

    // Check if the application was found and updated
    if (updatedApplication) {
      console.log('Leave application outTime updated:', updatedApplication);

      res.json(updatedApplication);
    } else {
      // If the application was not found or already processed
      console.log('Leave application not found or already processed');
      res.status(404).json({ message: 'Leave application not found or already processed' });
    }
  } catch (error) {
    console.error('Error updating leave outTime:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
  } else {
    console.log(`Server is running on port: ${port}`);
  }
});
