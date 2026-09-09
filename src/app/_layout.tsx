// app/_layout.tsx
import "../global.css"
import { Slot } from "expo-router";
import { ThemeProvider } from "../components/theme.provider"
import { useAppFonts } from "@/theme/fonts";
import { TransacoesProvider } from "@/context/TransacoesContext";
import { NavigationProvider } from "@/context/NavigationContext";
import { MetasProvider } from "@/context/MetasContext";
import { CompromissosProvider } from "@/context/CompromissosContext";
import { LembretesProvider } from "@/context/LembretesContext";
import { NotificacoesProvider } from "@/context/NotificacoesContext";
import { SimulacoesProvider } from "@/context/SimulacoesContext";
import { CotacoesProvider } from "@/context/CotacoesContext";
import { TaxasProvider } from "@/context/TaxasContext";
import { RecorrenciasProvider } from "@/context/RecorrenciasContext";
import { LimitesOrcamentoProvider } from "@/context/LimitesOrcamentoContext";
import { PerfilProvider } from "@/context/PerfilContext";
import { ResetAppProvider } from "@/context/ResetAppContext";
import { NovaTransacaoProvider } from "@/context/NovaTransacaoContext";
import { DialogoProvider } from "@/context/DialogoContext";



export default function RootLayout() {
  const [LoadedFonts] = useAppFonts()
  if (!LoadedFonts) return null

  return (
      <NavigationProvider>
       <DialogoProvider>
        <ResetAppProvider>
          <PerfilProvider>
           <ThemeProvider>
            <TransacoesProvider>
              <MetasProvider>
                <CompromissosProvider>
                  <LembretesProvider>
                   <NotificacoesProvider>
                    <SimulacoesProvider>
                      <CotacoesProvider>
                       <TaxasProvider>
                        <RecorrenciasProvider>
                          <LimitesOrcamentoProvider>
                            <NovaTransacaoProvider>
                              <Slot />
                            </NovaTransacaoProvider>
                          </LimitesOrcamentoProvider>
                        </RecorrenciasProvider>
                       </TaxasProvider>
                      </CotacoesProvider>
                    </SimulacoesProvider>
                   </NotificacoesProvider>
                  </LembretesProvider>
                </CompromissosProvider>
              </MetasProvider>
            </TransacoesProvider>
           </ThemeProvider>
          </PerfilProvider>
        </ResetAppProvider>
       </DialogoProvider>
      </NavigationProvider>
  );
}