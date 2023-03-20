# PCI Lentilles (lens) IMS Version

<img src="https://www.wiquid.fr/projects/depp/PCI-icons/lens.svg">

## Installation 
This repository is dedicated to Lentilles PCI. If you want to download all DEPP-Wiquid PCIs in a row, go to [Extension-Wiquid-Depp](https://github.com/janfix/Extension-Wiquid-Depp).
If not, download the PCI, create a ZIP with the ImsPciCreator file at the root level, go to TAO platform, in the top right tool bar click on ⚙️ (settings)> Portable custom interaction and install it as a package.

## Description
This PCI presents 2 activities. 
1. Based on an observation, the student has to create a complete spreadsheet, organizing clearly the informations.
2. On the same data, the student has to create a simple graph (curve)

## Results
The PCI collects data to verify if and how the elements were used : 

The results are in JSON format.
<br/> it is storing the spreadsheet under a JSON string : Tableur.C4.SomeContentWrittenbyStudent (C4 is the cell address)
<br/> It is also storing the graph under the domain name : graphique. This JSON string can be regenerated has a real graph
<br/> Navigation : count how many times the studing has changer of activity : .navigation = 2



<img src="https://www.wiquid.fr/wp-content/uploads/2021/12/cropped-cropped-WonderP50.png" alt="Wiquid" title="Wiquid">