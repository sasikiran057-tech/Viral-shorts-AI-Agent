package com.viralshortsai.app

import android.os.Bundle
import androidx.activity.compose.setContent
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.navigation.compose.rememberNavController
import com.viralshortsai.app.navigation.NavGraph
import com.viralshortsai.app.ui.theme.ViralShortsAITheme
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ViralShortsAITheme {
                MainScreen()
            }
        }
    }
}

@Composable
fun MainScreen() {
    val navController = rememberNavController()
    var selectedTab by remember { mutableIntStateOf(0) }
    val tabs = listOf(
        stringResource(R.string.home),
        stringResource(R.string.trends),
        stringResource(R.string.create),
        stringResource(R.string.analytics),
        stringResource(R.string.profile)
    )

    Scaffold(
        bottomBar = {
            NavigationBar {
                tabs.forEachIndexed { index, tab ->
                    NavigationBarItem(
                        icon = {
                            when (index) {
                                0 -> Icon(Icons.Filled.Home, contentDescription = tab)
                                1 -> Icon(Icons.Filled.TrendingUp, contentDescription = tab)
                                2 -> Icon(Icons.Filled.Add, contentDescription = tab)
                                3 -> Icon(Icons.Filled.BarChart, contentDescription = tab)
                                4 -> Icon(Icons.Filled.Person, contentDescription = tab)
                                else -> Unit
                            }
                        },
                        label = { Text(tab) },
                        selected = selectedTab == index,
                        onClick = {
                            selectedTab = index
                            when (index) {
                                0 -> navController.navigate("home")
                                1 -> navController.navigate("trends")
                                2 -> navController.navigate("create")
                                3 -> navController.navigate("analytics")
                                4 -> navController.navigate("profile")
                            }
                        }
                    )
                }
            }
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            NavGraph(navController)
        }
    }
}
