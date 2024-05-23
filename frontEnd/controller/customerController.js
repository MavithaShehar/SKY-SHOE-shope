
function generateShortUUID() {
   let dt = new Date().getTime();
   const shortUUID = 'xxxxx'.replace(/[x]/g, function(c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return r.toString(16);
   });
   return shortUUID;
}





function CustomerModel (customerId, customerName,gender,joinDate,level,totalPoints,birthday,contactNo,email,addressNoOrName) {
      this.customerId=customerId;
      this.customerName=customerName;
      this.gender=gender;
      this.joinDate=joinDate;
      this.level=level;
      this.totalPoints=totalPoints;
      this.birthday=birthday;
      this.contactNo=contactNo;
      this.email=email;
      this.addressNoOrName=addressNoOrName;
   }

var customer_db = [];

getAllCustomer()

function saveCustomer() {

   var customerId= $('#customerId').val();
   var customerName= $('#customerName').val();
   var gender = $('#gender').val().toUpperCase();
   var joinDate= $('#joinDate').val();
   var loyalty= $('#loyalty').val().toUpperCase();
   var totalPoints= $('#totalPoints').val();
   var birthday= $('#birthday').val();
   var contactNo= $('#contactNo').val();
   var email= $('#email').val();
   var addressNoOrName= $('#addressNoOrName').val();
   var addressLane= $('#addressLane').val();
   var addressCity= $('#addressCity').val();
   var addressState= $('#addressState').val();
   var postalCode= $('#postalCode').val();

   $.ajax({
      method: "POST",
      contentType: "application/json",
      url: "http://localhost:8080/api/v1/customer/saveCustomer",
      data: JSON.stringify({
         customerId: customerId,
         customerName: customerName,
         gender: gender,
         joinDate: joinDate,
         level: loyalty,
         totalPoints: totalPoints,
         birthday: birthday,
         contactNo: contactNo,
         email: email,
         addressNoOrName: addressNoOrName,
         addressLane: addressLane,
         addressCity: addressCity,
         addressState: addressState,
         postalCode: postalCode
      }),
      success: function(data) {
         alert("save")
         getAllCustomer();
      },
      error: function(xhr, exception) {
         alert("Error")
      }
   });

}

function updateCustomer() {

   var customerId= $('#customerId').val();
   var customerName= $('#customerName').val();
   var gender = $('#gender').val().toUpperCase();
   var joinDate= $('#joinDate').val();
   var loyalty= $('#loyalty').val().toUpperCase();
   var totalPoints= $('#totalPoints').val();
   var birthday= $('#birthday').val();
   var contactNo= $('#contactNo').val();
   var email= $('#email').val();
   var addressNoOrName= $('#addressNoOrName').val();
   var addressLane= $('#addressLane').val();
   var addressCity= $('#addressCity').val();
   var addressState= $('#addressState').val();
   var postalCode= $('#postalCode').val();

   $.ajax({
      method: "PUT",
      contentType: "application/json",
      url: "http://localhost:8080/api/v1/customer/updateCustomer",
      data: JSON.stringify({
         customerId: customerId,
         customerName: customerName,
         gender: gender,
         joinDate: joinDate,
         level: loyalty,
         totalPoints: totalPoints,
         birthday: birthday,
         contactNo: contactNo,
         email: email,
         addressNoOrName: addressNoOrName,
         addressLane: addressLane,
         addressCity: addressCity,
         addressState: addressState,
         postalCode: postalCode
      }),
      success: function(data) {
         getAllCustomer();
         alert("save")
      },
      error: function(xhr, exception) {
         alert("Error")
      }
   });

}

function getAllCustomer(){

   console.log(generateShortUUID());

   $.ajax({
      method: "GET",
      url: "http://localhost:8080/api/v1/customer/getAllCustomer",
      async:true,
      success: function(data) {
         if (data.code === "00"){
            $('#customerTable').empty();
            for(let cust of data.content){

               let levelColor = '';

               if (cust.level === 'GOLD') {
                  levelColor = '#F97300'; // orange
               } else if (cust.level === 'BRONZE') {
                  levelColor = '#AF8260'; // bronze
               } else if (cust.level === 'SILVER') {
                  levelColor = '#524C42'; // silver
               } else {
                  levelColor = '#4793AF'; // default color
               }

               let customerId = cust.customerId;
                  let customerName = cust.customerName;
                  let gender = cust.gender;
                  let joinDate = cust.joinDate;
                  let level = cust.level;
                  let totalPoints = cust.totalPoints;
                  let birthday = cust.birthday;
                  let contactNo = cust.contactNo;
                  let email = cust.email;
                  let addressNoOrName = cust.addressNoOrName;

               var row = `<tr>
                            <td class="col01" >${customerId}</td>
                            <td class="col02" >${customerName}</td>
                            <td class="col03" >${gender}</td>
                            <td class="col04" >${joinDate}</td>
                            <td class="col05"  class="level-cell" style="background-color: ${levelColor}; font-weight: bold;">${level}</td>
                            <td class="col06" >${totalPoints}</td>
                            <td class="col07" >${birthday}</td>
                            <td class="col08" >${contactNo}</td>
                            <td class="col09" >${email}</td>
                            <td class="col10" >${addressNoOrName}</td>
                             <td class="selection"><button type="button"  class="btn btn-danger">X</button></i></td>
                                                        </tr>`;

               $('#customerTable').append(row);

               let customer = new CustomerModel(customerId,
               customerName,
               gender,
               joinDate,
               level,
               totalPoints,
               birthday,
               contactNo,
               email,
               addressNoOrName);
               customer_db.push(customer);

            }
         }
      },
      error: function(xhr, exception) {
         alert("Error")
      }
   });

}

// fill customer
$('#customerTable').on('click', 'tr' , function() {

   let index = $(this).index();

   let col01 = $(this).find('.col01').text();

   getCustomer(col01);

});

function getCustomer(customer_id){


   $.ajax({
      method: "GET",
      url: "http://localhost:8080/api/v1/customer/getCustomer/"+customer_id,
      async:true,
      success: function(data) {
         if (data.code === "00"){

               let cust = data.content;

            $('#customerId').val(cust.customerId);
            $('#customerName').val(cust.customerName);
            $('#gender').val(cust.gender.toUpperCase()); // Assign the uppercase value
            $('#joinDate').val(cust.joinDate);
            $('#loyalty').val(cust.level.toUpperCase()); // Assign the uppercase value
            $('#totalPoints').val(cust.totalPoints !== undefined ? cust.totalPoints : '');
            $('#birthday').val(cust.birthday);
            $('#contactNo').val(cust.contactNo);
            $('#email').val(cust.email);
            $('#addressNoOrName').val(cust.addressNoOrName);
            $('#addressLane').val(cust.addressLane);
            $('#addressCity').val(cust.addressCity);
            $('#addressState').val(cust.addressState);
            $('#postalCode').val(cust.postalCode);


         }
      },
      error: function(xhr, exception) {
         alert("Error")
      }
   });
}

// Delete
$('#customerTable').on('click', '.selection button', function () {

   const cust_ID = $(this).closest('tr').find('.col01').text();

   $.ajax({
      method: "DELETE",
      url: "http://localhost:8080/api/v1/customer/deleteCustomer/"+cust_ID,
      async:true,
      success: function(data) {
         alert("success")
         $('#customerTable').empty();
         getAllCustomer();
      },
      error: function(xhr, exception) {
         alert("Error")
      }
   });


});

// serch customer
$('#customer-search').on('input', () => {
   let search_term = $('#customer-search').val();

   console.log(search_term);

   console.log(search_term)

   let results = customer_db.filter((item) =>

       item.customerId.toLowerCase().startsWith(search_term.toLowerCase()) ||
       item.customerName.toLowerCase().startsWith(search_term.toLowerCase()) ||
       item.addressNoOrName.toLowerCase().startsWith(search_term.toLowerCase()) ||
       item.contactNo.startsWith(search_term)

   );


   $('#customerTable').empty();
   results.map((item, index) => {

      let levelColor = '';

      if (item.level === 'GOLD') {
         levelColor = '#F97300'; // orange
      } else if (item.level === 'BRONZE') {
         levelColor = '#AF8260'; // bronze
      } else if (item.level === 'SILVER') {
         levelColor = '#524C42'; // silver
      } else {
         levelColor = '#4793AF'; // default color
      }


      let tbl_row = `<tr>
                            <td class="col01" >${item.customerId}</td>
                            <td class="col02" >${item.customerName}</td>
                            <td class="col03" >${item.gender}</td>
                            <td class="col04" >${item.joinDate}</td>
                            <td class="col05"  class="level-cell" style="background-color: ${levelColor}; font-weight: bold;">${item.level}</td>
                            <td class="col06" >${item.totalPoints}</td>
                            <td class="col07" >${item.birthday}</td>
                            <td class="col08" >${item.contactNo}</td>
                            <td class="col09" >${item.email}</td>
                            <td class="col10" >${item.addressNoOrName}</td>
                             <td class="selection"><button type="button"  class="btn btn-danger">X</button></i></td>
                                                        </tr>`;
      $('#customerTable').append(tbl_row);
   });

});

// Filter customer level
$('#select-loyalty').on('change', () => {

   $('#customerTable').empty();

   let search_term = $('#select-loyalty').val().toUpperCase();

   console.log(search_term);

   if (search_term === "ALLCUSTOMER"){
      $('#customerTable').empty();
      displayAllCustomers()
   }else {

      $('#customerTable').empty();

      let results = customer_db.filter((item) =>
          item.level.toUpperCase().startsWith(search_term)
      );


      results.forEach((item, index) => {
         let levelColor = '';

         if (item.level === 'GOLD') {
            levelColor = '#F97300'; // orange
         } else if (item.level === 'BRONZE') {
            levelColor = '#AF8260'; // bronze
         } else if (item.level === 'SILVER') {
            levelColor = '#524C42'; // silver
         } else {
            levelColor = '#4793AF'; // default color
         }

         let tbl_row = `<tr>
                            <td class="col01" >${item.customerId}</td>
                            <td class="col02" >${item.customerName}</td>
                            <td class="col03" >${item.gender}</td>
                            <td class="col04" >${item.joinDate}</td>
                            <td class="col05"  class="level-cell" style="background-color: ${levelColor}; font-weight: bold;">${item.level}</td>
                            <td class="col06" >${item.totalPoints}</td>
                            <td class="col07" >${item.birthday}</td>
                            <td class="col08" >${item.contactNo}</td>
                            <td class="col09" >${item.email}</td>
                            <td class="col10" >${item.addressNoOrName}</td>
                            <td class="selection"><button type="button"  class="btn btn-danger">X</button></i></td>
                        </tr>`;

         $('#customerTable').append(tbl_row);



      });
   }

});

function displayAllCustomers() {
   // Display all customers from the original list
   customer_db.forEach((item, index) => {
      let levelColor = '';

      if (item.level === 'GOLD') {
         levelColor = '#F97300'; // orange
      } else if (item.level === 'BRONZE') {
         levelColor = '#AF8260'; // bronze
      } else if (item.level === 'SILVER') {
         levelColor = '#524C42'; // silver
      } else {
         levelColor = '#4793AF'; // default color
      }

      let tbl_row = `<tr>
                            <td class="col01">${item.customerId}</td>
                            <td class="col02">${item.customerName}</td>
                            <td class="col03">${item.gender}</td>
                            <td class="col04">${item.joinDate}</td>
                            <td class="col05 level-cell" style="background-color: ${levelColor}; font-weight: bold;">${item.level}</td>
                            <td class="col06">${item.totalPoints}</td>
                            <td class="col07">${item.birthday}</td>
                            <td class="col08">${item.contactNo}</td>
                            <td class="col09">${item.email}</td>
                            <td class="col10">${item.addressNoOrName}</td>
                            <td class="selection"><button type="button" class="btn btn-danger">X</button></td>
                        </tr>`;
      $('#customerTable').append(tbl_row);
   });
}


// serch date
$('#cust-date-piker').on('input', () => {
   let search_term = $('#cust-date-piker').val();

   let results = customer_db.filter((item) =>

       item.joinDate.toLowerCase().startsWith(search_term.toLowerCase())||
       item.birthday.toLowerCase().startsWith(search_term.toLowerCase())

   );


   $('#customerTable').empty();
   results.map((item, index) => {

      let levelColor = '';

      if (item.level === 'GOLD') {
         levelColor = '#F97300'; // orange
      } else if (item.level === 'BRONZE') {
         levelColor = '#AF8260'; // bronze
      } else if (item.level === 'SILVER') {
         levelColor = '#524C42'; // silver
      } else {
         levelColor = '#4793AF'; // default color
      }


      let tbl_row = `<tr>
                            <td class="col01" >${item.customerId}</td>
                            <td class="col02" >${item.customerName}</td>
                            <td class="col03" >${item.gender}</td>
                            <td class="col04" >${item.joinDate}</td>
                            <td class="col05"  class="level-cell" style="background-color: ${levelColor}; font-weight: bold;">${item.level}</td>
                            <td class="col06" >${item.totalPoints}</td>
                            <td class="col07" >${item.birthday}</td>
                            <td class="col08" >${item.contactNo}</td>
                            <td class="col09" >${item.email}</td>
                            <td class="col10" >${item.addressNoOrName}</td>
                             <td class="selection"><button type="button"  class="btn btn-danger">X</button></i></td>
                                                        </tr>`;
      $('#customerTable').append(tbl_row);
   });

});

