package bca.co.id.mini_internet_banking;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    private EditText txtUsername, txtPassword;
    private TextView txtNewRek;
    private Button btnLogin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        txtUsername = (EditText)findViewById(R.id.txtUsername);
        txtPassword = (EditText)findViewById(R.id.txtPassword);
        txtNewRek = (TextView)findViewById(R.id.txtNewRek);
        btnLogin = (Button)findViewById(R.id.btnLogin);

        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                login();
            }
        });

        txtNewRek.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loadRekeningView();
            }
        });


    }

    private void login(){
        Intent intent = new Intent(this, HomeActivity.class);
        startActivity(intent);
        finish();
    }

    private void loadRekeningView(){
        Intent intent = new Intent(this, RekeningActivity.class);
        startActivity(intent);
    }
}
