package bca.co.id.mini_internet_banking;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;

public class RekeningActivity extends AppCompatActivity {
    private EditText txtName, txtEmail, txtPass, txtKtp, txtBirthday, txtAddress, txtCode;
    private Button btnSubmit, btnReset;
    Calendar myCalendar = Calendar.getInstance();

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_rekening);

        txtName = (EditText)findViewById(R.id.txtName);
        txtEmail = (EditText)findViewById(R.id.txtEmail);
        txtPass = (EditText)findViewById(R.id.txtPass);
        txtKtp = (EditText)findViewById(R.id.txtKtp);
        txtBirthday = (EditText)findViewById(R.id.txtBirthday);
        txtAddress = (EditText)findViewById(R.id.txtAddress);
        txtCode = (EditText)findViewById(R.id.txtCode);
        btnSubmit = (Button)findViewById(R.id.btnSubmit);
        btnReset = (Button)findViewById(R.id.btnReset);

        final DatePickerDialog.OnDateSetListener date = new DatePickerDialog.OnDateSetListener() {
            @Override
            public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
                myCalendar.set(Calendar.YEAR, year);
                myCalendar.set(Calendar.MONTH, month);
                myCalendar.set(Calendar.DAY_OF_MONTH, dayOfMonth);
                updateLabel();
            }
        };

        txtBirthday.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                new DatePickerDialog(RekeningActivity.this, date,
                        myCalendar.get(Calendar.YEAR), myCalendar.get(Calendar.MONTH),
                        myCalendar.get(Calendar.DAY_OF_MONTH)).show();
            }
        });

        btnReset.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                resetForm();
            }
        });

        btnSubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                submitData();
            }
        });
    }

    private void updateLabel() {
        String myFormat = "MM/dd/yy"; //In which you need put here
        SimpleDateFormat sdf = new SimpleDateFormat(myFormat, Locale.US);

        txtBirthday.setText(sdf.format(myCalendar.getTime()));
    }

    private void resetForm(){
        txtName.setText("");
        txtEmail.setText("");
        txtPass.setText("");
        txtKtp.setText("");
        txtBirthday.setText("");
        txtAddress.setText("");
        txtCode.setText("");
    }

    private void submitData(){

        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish();
    }
}
